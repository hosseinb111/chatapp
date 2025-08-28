// Supabase Configuration
// Replace these with your actual Supabase URL and anon key
const SUPABASE_URL = 'https://fzjkpppzwiuozvszbbdl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6amtwcHB6d2l1b3p2c3piYmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzODEwOTAsImV4cCI6MjA3MTk1NzA5MH0.32p6IZZYDIhd1RtPX8NgOv-kPjI-YBl5wCX5ajNnarg';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global state
let currentUser = null;
let currentChatId = 'general'; // Default chat room
let messageSubscription = null;

// DOM Elements
const elements = {
    loginBtn: document.getElementById('loginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    loginModal: document.getElementById('loginModal'),
    loginForm: document.getElementById('loginForm'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    loginError: document.getElementById('loginError'),
    signupToggle: document.getElementById('signupToggle'),
    closeModal: document.getElementById('closeModal'),
    authSection: document.getElementById('authSection'),
    loggedInSection: document.getElementById('loggedInSection'),
    userEmail: document.getElementById('userEmail'),
    messageForm: document.getElementById('messageForm'),
    messageInput: document.getElementById('messageInput'),
    sendButton: document.getElementById('sendButton'),
    messagesArea: document.getElementById('messagesArea'),
    messagesContainer: document.getElementById('messagesContainer'),
    loadingState: document.getElementById('loadingState'),
    chatStatus: document.getElementById('chatStatus'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    toggleSidebar: document.getElementById('toggleSidebar'),
    sidebar: document.getElementById('sidebar')
};

// Initialize the app
async function init() {
    // Check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        updateUIForLoggedInUser();
    }

    // Set up auth state listener
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            currentUser = session.user;
            updateUIForLoggedInUser();
        } else {
            currentUser = null;
            updateUIForLoggedOutUser();
        }
    });

    // Set up event listeners
    setupEventListeners();

    // Initialize dark mode
    initializeDarkMode();

    // Create messages table if it doesn't exist (for development)
    await createMessagesTableIfNeeded();
}

// Create messages table if needed (for development purposes)
async function createMessagesTableIfNeeded() {
    // Note: In production, you should create this table through Supabase dashboard
    // This is just for reference of the expected table structure
    console.log('Messages table structure needed:');
    console.log(`
        CREATE TABLE messages (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            sender_id UUID REFERENCES auth.users(id),
            receiver_id TEXT,
            message_text TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
        
        -- Create policy to allow authenticated users to insert messages
        CREATE POLICY "Users can insert their own messages" ON messages
            FOR INSERT WITH CHECK (auth.uid() = sender_id);
        
        -- Create policy to allow users to view messages
        CREATE POLICY "Users can view messages" ON messages
            FOR SELECT USING (true);
    `);
}

// Set up event listeners
function setupEventListeners() {
    elements.loginBtn.addEventListener('click', () => showLoginModal());
    elements.logoutBtn.addEventListener('click', () => logout());
    elements.loginForm.addEventListener('submit', (e) => handleLogin(e));
    elements.signupToggle.addEventListener('click', () => handleSignup());
    elements.closeModal.addEventListener('click', () => hideLoginModal());
    elements.messageForm.addEventListener('submit', (e) => sendMessage(e));
    elements.darkModeToggle.addEventListener('click', () => toggleDarkMode());
    elements.toggleSidebar.addEventListener('click', () => toggleSidebar());

    // Close modal on outside click
    elements.loginModal.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) {
            hideLoginModal();
        }
    });
}

// Authentication functions
function showLoginModal() {
    elements.loginModal.classList.remove('hidden');
    elements.loginError.classList.add('hidden');
}

function hideLoginModal() {
    elements.loginModal.classList.add('hidden');
    elements.loginForm.reset();
    elements.loginError.classList.add('hidden');
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = elements.loginEmail.value
