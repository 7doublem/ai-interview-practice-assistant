# AVA - Interview Practice Assistant

A modern, AI-powered interview practice application built with Next.js, React, and TypeScript. AVA helps students prepare for medical school interviews by providing structured, supportive feedback on their responses to common interview questions.

## 🚀 Features

- **5 Hardcoded Interview Questions**: Curated questions specifically for medical school preparation
- **AI-Powered Feedback**: Structured feedback using OpenAI's GPT-3.5-turbo model
- **Beautiful UI**: Clean, student-friendly interface with purple-to-blue gradients
- **Progress Tracking**: Visual progress indicator and scoring system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful handling of API errors and network issues
- **Smooth Animations**: Hover effects, loading spinners, and fade-in transitions
- **Final Results**: Comprehensive scoring with motivational messages

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.0 or later
- npm or yarn package manager
- OpenAI API key

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ava-mvp.git
cd ava-mvp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

1. Copy the environment example file:
```bash
cp env.example .env.local
```

2. Add your OpenAI API key to `.env.local`:
```bash
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
ava-mvp/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   └── feedback/      # OpenAI feedback endpoint
│   │   ├── globals.css        # Global styles and animations
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Main application page
│   ├── components/            # React components
│   │   ├── Header.tsx         # App header with AVA branding
│   │   ├── ProgressIndicator.tsx # Progress tracking component
│   │   ├── QuestionDisplay.tsx   # Question presentation
│   │   ├── AnswerInput.tsx       # Text input for answers
│   │   ├── FeedbackDisplay.tsx   # AI feedback presentation
│   │   └── FinalResults.tsx      # Session completion screen
│   ├── data/                  # Static data
│   │   └── questions.ts       # Interview questions
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Application interfaces
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple to blue gradient (`#8b5cf6` to `#3b82f6`)
- **Accent**: Cyan (`#06b6d4`)
- **Success**: Green/Teal (`#10b981` to `#14b8a6`)
- **Warning**: Orange/Yellow (`#f97316` to `#eab308`)
- **Background**: Light gray to blue gradient

### Typography
- **Headers**: Bold, gradient text with responsive sizing
- **Body**: Clean, readable fonts with proper line spacing
- **Interactive**: Clear button text with hover states

### Animations
- **Fade-in**: Smooth entrance animations for content
- **Hover effects**: Subtle lift and shadow changes
- **Loading states**: Spinning indicators and pulse effects
- **Transitions**: 200ms ease-in-out for all interactions

## 🔧 API Integration

### OpenAI Configuration

The application uses OpenAI's GPT-3.5-turbo model for generating structured feedback. The API endpoint (`/api/feedback`) expects:

**Request Body:**
```json
{
  "question": "Why do you want to study medicine?",
  "answer": "Student's response here...",
  "questionNumber": 1,
  "totalQuestions": 5
}
```

**Response:**
```json
{
  "summary": "Brief summary of the answer",
  "strengths": ["Strength 1", "Strength 2"],
  "areasToImprove": ["Area 1", "Area 2"],
  "nextStep": "Specific actionable advice",
  "score": 85,
  "motivationalPhrase": "Great job!"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Considerations

- API keys are stored in environment variables
- Input validation on both client and server
- Error handling prevents sensitive information leakage
- CORS configured for production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎨 Assets

- **Robot SVG**: Custom-designed friendly robot mascot (original artwork)

## 🆘 Troubleshooting

### Common Issues

**OpenAI API Errors:**
- Verify your API key is correct
- Check your OpenAI account has sufficient credits
- Ensure the API key has the necessary permissions

**Build Errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

**Styling Issues:**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS imports
- Verify responsive breakpoints

## 🚀 Future Improvements

With more development time, the following enhancements could be implemented:

### Enhanced AI Features
- **Multiple AI Models**: Support for GPT-4, Claude, or other LLMs
- **Custom Prompts**: Allow users to customize feedback style
- **Question Categories**: Organize questions by medical specialties
- **Adaptive Difficulty**: Adjust question complexity based on performance

### User Experience
- **User Accounts**: Save progress and track improvement over time
- **Question Bank**: Expandable database of interview questions
- **Practice Modes**: Timed practice, mock interviews, or study sessions
- **Progress Analytics**: Detailed performance metrics and trends

### Technical Enhancements
- **Offline Support**: PWA capabilities for offline practice
- **Voice Recording**: Audio answer submission and feedback
- **Real-time Collaboration**: Share sessions with mentors or peers
- **Advanced Analytics**: Machine learning insights on improvement patterns

### Accessibility & Internationalization
- **Screen Reader Support**: Enhanced accessibility for visually impaired users
- **Multi-language Support**: Spanish, French, and other language options
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast Mode**: Better visibility for users with visual impairments

### Performance & Scalability
- **Caching Strategy**: Redis or similar for API response caching
- **CDN Integration**: Faster global content delivery
- **Database Integration**: PostgreSQL or MongoDB for user data
- **Microservices**: Separate services for different functionalities

---

**Built with ❤️ for aspiring medical students**

For support or questions, please open an issue on GitHub or contact the development team.