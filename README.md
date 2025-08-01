# ABZ Agency Test

A modern React application built for ABZ Agency's front-end developer test assignment. This application demonstrates user management functionality with a clean, responsive design and smooth user experience.

## 🚀 Features

### User Management
- **Users List**: Display users with pagination and "Show more" functionality
- **User Registration**: Complete sign-up form with validation
- **Real-time Updates**: Automatic refresh of users list after successful registration

### User Interface
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Navigation**: Anchor-based scrolling between sections
- **Loading States**: Elegant loading indicators with spinning animations
- **Form Validation**: Real-time field validation with error messages
- **Custom Components**: Reusable UI components with consistent styling

### Advanced Features
- **Phone Input**: Ukrainian phone number formatting (+38 0XX-XXX-XX-XX)
- **File Upload**: Photo upload with validation
- **Email Tooltips**: Hover tooltips showing full email addresses
- **Error Handling**: Comprehensive API error handling and user feedback

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React hooks (useState, useEffect)
- **Form Handling**: Custom form validation
- **Icons**: Lucide React
- **Development**: ESLint, Prettier, TypeScript

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd abz-agency-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run typecheck` - Type checking
- `npm run format.fix` - Format code with Prettier

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── sections/        # Page sections (Header, Hero, Users, SignUp)
│   ├── ui/             # Base UI components
│   ├── Button.tsx      # Custom button component
│   ├── Input.tsx       # Form input component
│   ├── PhoneInput.tsx  # Ukrainian phone input
│   ├── RadioButton.tsx # Radio button component
│   └── UserCard.tsx    # User display card
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🎨 Design Features

### Responsive Layout
- Mobile-first approach
- Flexible grid system
- Optimized images with WebP format
- Smooth transitions and animations

### Form Components
- **Custom Input**: Floating labels, validation states
- **Phone Input**: Auto-formatting for Ukrainian numbers
- **File Upload**: Custom styled file picker
- **Radio Buttons**: Custom styled position selection

### User Experience
- **Loading States**: Spinner animations during API calls
- **Error Handling**: Field-specific error messages
- **Success Feedback**: Visual confirmation of successful actions
- **Smooth Scrolling**: Anchor navigation between sections

## 🔗 API Integration

The application integrates with ABZ Agency's test API:
- **GET /users** - Fetch users with pagination
- **GET /positions** - Fetch available positions
- **POST /users** - Register new user
- **GET /token** - Authentication token

### API Features
- Pagination support (6 users per page)
- Form validation
- Error handling
- File upload for user photos

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 📝 Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Component Architecture**: Modular, reusable components

## 🎯 Key Implementation Details

### Phone Number Validation
- Supports Ukrainian format: +38 (0XX) XXX-XX-XX
- Auto-formatting as user types
- Validation for correct format

### Form Management
- Real-time validation
- Field-specific error messages
- Loading states during submission
- Success handling with list refresh

### State Management
- React hooks for local state
- Lifting state up for shared data
- Efficient re-renders with proper dependencies

### Performance Optimizations
- Optimized images (WebP format, multiple sizes)
- Efficient component re-renders
- Lazy loading where appropriate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for ABZ Agency's test assignment.

## 📞 Contact

For questions about this implementation, please reach out through the appropriate channels.

---

**Built with ❤️ for ABZ Agency**
