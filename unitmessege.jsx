{
  "name": "Message",
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "description": "The message content"
    },
    "sender_name": {
      "type": "string",
      "description": "Name of the sender"
    },
    "sender_email": {
      "type": "string",
      "description": "Email of the sender"
    },
    "room": {
      "type": "string",
      "default": "general",
      "description": "Chat room/channel"
    },
    "message_type": {
      "type": "string",
      "enum": [
        "text",
        "system"
      ],
      "default": "text",
      "description": "Type of message"
    }
  },
  "required": [
    "content",
    "sender_name",
    "sender_email"
  ]
}
