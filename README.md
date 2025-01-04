# ReadNow

ReadNow is an innovative platform that helps users improve their English reading skills through AI-generated articles. The platform offers content at different proficiency levels and includes features like vocabulary tracking and reading progress monitoring.

## Features

- AI-generated English articles at multiple proficiency levels
- Vocabulary tracking system
- Reading progress monitoring
- Interactive quizzes
- Responsive design for all devices

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── articles/
│   │   ├── [level]/
│   │   │   ├── [articleId]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   ├── saved-words/
│   │   └── page.tsx
│   ├── reading-progress/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ArticleQuiz.tsx
│   ├── BackButton.tsx
│   ├── HighlightedText.tsx
│   ├── KeyboardShortcutHint.tsx
│   ├── MDXContent.tsx
│   ├── Navbar.tsx
│   ├── ReadingProgressButton.tsx
│   ├── ReadingStatus.tsx
│   └── WordSelectionWrapper.tsx
├── hooks/
│   ├── useReadingProgress.ts
│   └── useWordSelection.ts
├── public/
│   └── logo.svg
├── utils/
│   └── articles.ts
```

## Technologies Used

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- MDX for article content
- Lucide Icons

## Getting Started

To get started with this project:

```bash
git clone https://github.com/yourusername/readnow.git
cd readnow
npm install
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



