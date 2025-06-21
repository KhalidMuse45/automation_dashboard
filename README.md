# Nokia Internal Developer Automation Dashboard

A modern, React-based frontend for Nokia's internal developer automation dashboard. Built with clean, professional design using Tailwind CSS.

## 🌟 Features

### Input Components
- **FilePathInput**: Unix path validation with real-time feedback
- **DevIDInput**: Toggle between Dev ID and IP:Port modes with appropriate validation
- **SuiteSelector**: Multi-select checkboxes for test suites (FunTest, ExpressTest, FullSuite)
- **BranchSelector**: Multi-select dropdown for Git branches
- **ReviewerDropdown**: Dropdown with reviewer profiles and roles

### Control Panel
- **RunTestsButton**: Primary action button (disabled until required fields are valid)
- **SubmitReviewButton**: Secondary action (disabled until tests pass)
- **StartAutomationButton**: Final action (disabled until review approved)
- **RerunFailedTestsButton**: Conditional button (only visible when tests fail)

### Status Panel
- **Compile Status Badge**: Real-time compilation status with animations
- **Test Results Table**: Detailed test execution results with pass/fail indicators
- **Review Status Badge**: Review workflow status tracking
- **Log Viewer**: Scrollable, filterable log display with syntax highlighting

## 🎨 Design Features

- **Modern UI**: Clean, professional enterprise design
- **Responsive**: Works on desktop and tablet views
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Real-time Validation**: Instant feedback on form inputs
- **Status Indicators**: Visual status badges with appropriate colors
- **Interactive Elements**: Hover states, focus rings, and smooth transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── FilePathInput.jsx      # Unix path input with validation
│   ├── DevIDInput.jsx         # Dev ID / IP:Port toggle input
│   ├── SuiteSelector.jsx      # Multi-select test suite picker
│   ├── BranchSelector.jsx     # Multi-select branch dropdown
│   ├── ReviewerDropdown.jsx   # Reviewer selection dropdown
│   ├── ControlButtons.jsx     # Action buttons with state management
│   └── StatusPanel.jsx        # Status indicators and log viewer
├── App.jsx                    # Main application component
├── index.js                   # Application entry point
└── index.css                  # Tailwind CSS and custom styles
```

## 🎯 Component Usage

### FilePathInput
```jsx
<FilePathInput
  value={filePath}
  onChange={(value, isValid) => {
    setFilePath(value);
    setFilePathValid(isValid);
  }}
/>
```

### DevIDInput
```jsx
<DevIDInput
  value={devId}
  mode={devIdMode}
  onChange={(value, mode, isValid) => {
    setDevId(value);
    setDevIdMode(mode);
    setDevIdValid(isValid);
  }}
/>
```

### SuiteSelector
```jsx
<SuiteSelector
  selectedSuites={selectedSuites}
  onChange={setSelectedSuites}
/>
```

### ControlButtons
```jsx
<ControlButtons
  canRunTests={canRunTests}
  canSubmitReview={canSubmitReview}
  canStartAutomation={canStartAutomation}
  hasFailedTests={hasFailedTests}
  onRunTests={handleRunTests}
  onSubmitReview={handleSubmitReview}
  onStartAutomation={handleStartAutomation}
  onRerunFailedTests={handleRerunFailedTests}
/>
```

## 🎨 Customization

### Colors
The dashboard uses a custom Nokia color palette defined in `tailwind.config.js`:

- `nokia-blue`: Primary brand colors
- `nokia-gray`: Neutral grays for text and backgrounds

### Typography
- **Primary Font**: Inter (modern, clean)
- **Fallback**: System UI fonts

### Components
All components are built with Tailwind CSS utility classes and can be easily customized by modifying the component files or extending the Tailwind configuration.

## 🔧 Development

### Adding New Components
1. Create a new component file in `src/components/`
2. Export the component as default
3. Import and use in `App.jsx`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established color palette
- Maintain consistent spacing (4px grid)
- Use soft shadows and rounded corners
- Ensure responsive design

### State Management
The app uses React hooks for state management:
- Form state in the main App component
- Local component state for UI interactions
- Props for component communication

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Desktop**: 3-column layout (1 input + 2 status)
- **Tablet**: Stacked layout with proper spacing
- **Mobile**: Single column layout

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Internal Nokia project - not for external distribution.

## 🤝 Contributing

1. Follow the established code style
2. Add proper validation and error handling
3. Test on multiple screen sizes
4. Ensure accessibility compliance
5. Update documentation as needed

---

Built with ❤️ for Nokia's internal development team # bug_automation
