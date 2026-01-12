# VeloGossem 📝

> AI-Powered Markdown Documentation Generator

An intelligent documentation assistant that uses Google's Gemini 3 Flash to generate professional, well-structured markdown documentation in real-time.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-3%20Flash-orange?style=flat-square)

## ✨ Features

- 🤖 **AI-Powered Generation** - Leverages Google Gemini 3 Flash for intelligent content creation
- ⚡ **Real-time Streaming** - Watch your documentation appear as it's being generated
- 📋 **6 Documentation Templates** - Pre-configured prompts for different doc types
- 🎨 **Live Markdown Preview** - GitHub-style rendering with syntax highlighting
- 🔄 **Multiple AI Models** - Switch between Gemini 3 Flash, 2.0 Flash, 1.5 Flash, and 1.5 Pro
- 💾 **Export Options** - Copy to clipboard or download as .md file
- 🌓 **Dark Mode** - Beautiful UI that works in light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yeasirahnaf/VeloGlossem.git
   cd VeloGlossem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Generating Documentation

1. **Select a Template** - Choose from README, API Reference, Getting Started, Changelog, Architecture, or Contributing
2. **Choose a Model** - Select your preferred Gemini model (3 Flash recommended)
3. **Enter Your Prompt** - Describe what you want to document
4. **Click Generate** - Watch as AI creates your documentation in real-time
5. **Export** - Copy to clipboard or download as a .md file

### Available Templates

| Template | Description | Best For |
|----------|-------------|----------|
| **README** | Project overview and features | New projects, open source repos |
| **API Reference** | Endpoint documentation | REST APIs, SDKs |
| **Getting Started** | Setup and installation guides | Tutorials, onboarding |
| **Changelog** | Version history tracking | Release notes, updates |
| **Architecture** | System design documentation | Technical specs, diagrams |
| **Contributing** | Developer guidelines | Open source projects |

### Available Models

| Model | Description | Speed | Quality |
|-------|-------------|-------|---------|
| **Gemini 3 Flash** | Latest model (recommended) | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| **Gemini 2.0 Flash** | Experimental features | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| **Gemini 1.5 Flash** | Fast and efficient | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| **Gemini 1.5 Pro** | Most capable 1.5 model | ⚡⚡ | ⭐⭐⭐⭐⭐ |

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[@google/genai](https://www.npmjs.com/package/@google/genai)** - Official Google Gemini SDK

### UI Components
- **[react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor)** - Code editor
- **[Prism.js](https://prismjs.com/)** - Syntax highlighting
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful prose styling
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Lucide React](https://lucide.dev/)** - Icon library

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Geist Font](https://vercel.com/font)** - Modern typography

## 📁 Project Structure

```
veloglossem/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/
│   │   │   │   └── route.ts          # AI generation endpoint
│   │   │   └── test/
│   │   │       └── route.ts          # API test endpoint
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── CodeEditor.tsx            # Code input editor
│   │   ├── MarkdownPreview.tsx       # Markdown preview panel
│   │   └── Workspace.tsx             # Main workspace layout
│   ├── lib/
│   │   └── prompts.ts                # Documentation templates
│   └── types/
│       └── index.ts                  # TypeScript definitions
├── .env.local                        # Environment variables (create this)
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Your Google Gemini API key | ✅ Yes |

### Customization

#### Adding New Templates

Edit `src/lib/prompts.ts`:

```typescript
export const documentationTemplates: DocumentationTemplate[] = [
  {
    id: 'custom',
    name: 'Custom Template',
    description: 'Your custom documentation type',
    systemPrompt: 'Your custom system prompt here...',
  },
  // ... existing templates
];
```

#### Changing Default Model

Edit `src/app/api/generate/route.ts`:

```typescript
const { prompt, systemPrompt, model = 'your-preferred-model' } = await req.json();
```

## 🧪 Testing

### Test API Connection

Visit [http://localhost:3000/api/test](http://localhost:3000/api/test) to verify your API key is configured correctly.

Expected response:
```json
{
  "success": true,
  "model": "gemini-3-flash-preview",
  "sdk": "@google/genai",
  "response": "Hello, API is working!",
  "message": "API is configured correctly"
}
```

### Run Build

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

## 📝 API Reference

### POST /api/generate

Generate documentation using AI.

**Request Body:**
```json
{
  "prompt": "Create a README for a todo app",
  "systemPrompt": "You are a technical writer...",
  "model": "gemini-3-flash-preview"
}
```

**Response:**
- Streaming text/plain response
- Real-time markdown content

**Example:**
```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Your prompt here',
    systemPrompt: 'Optional system prompt',
    model: 'gemini-3-flash-preview'
  })
});

const reader = response.body.getReader();
// Read stream...
```

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yeasirahnaf/VeloGlossem)

1. Click the button above
2. Add your `GOOGLE_GENERATIVE_AI_API_KEY` in environment variables
3. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - For the amazing AI models
- [Vercel](https://vercel.com/) - For Next.js and hosting
- [Tailwind CSS](https://tailwindcss.com/) - For the styling framework

## 📧 Contact

Yeasir Ahnaf - [@yeasirahnaf](https://github.com/yeasirahnaf)

Project Link: [https://github.com/yeasirahnaf/VeloGlossem](https://github.com/yeasirahnaf/VeloGlossem)

---

<p align="center">Made with ❤️ using Next.js and Google Gemini</p>
