import {
  BookOpen,
  BookCopy,
  Album,
  Bot
} from "lucide-react"

const menuLinks = [
  {
    name: "Study Assistant",
    url: "/study-assistant",
    icon: <BookOpen className="mr-2 h-4 w-4" />
  },
  {
    name: "Study Guide",
    url: "/study-guide",
    icon: <BookCopy className="mr-2 h-4 w-4" />
  },
  {
    name: "Flashcard",
    url: "/flashcard",
    icon: <Album className="mr-2 h-4 w-4" />
  },
  {
    name: "Chatbot",
    url: "/chat",
    icon: <Bot className="mr-2 h-4 w-4" />
  },
];

export default menuLinks;