# ExamTraining

ExamTraining is a specialized web application designed for technical knowledge validation and continuous learning through custom-defined assessments. The platform operates entirely on user-provided data, requiring no internal database or persistent backend.

## Project Overview

The core objective of ExamTraining is to provide a clean, distraction-free environment where professionals can practice and master specific technical topics by interacting with their own curated question sets. By utilizing a JSON-driven architecture, the application remains flexible and adaptable to any technical domain.

## Key Features

- JSON-Driven Assessments: Users can upload their own question sets in a standard JSON format to begin training immediately.
- Drag and Drop Support: A modern interface that allows for seamless file handling.
- Customizable Exam Configuration: Users can select the number of questions and toggle real-time explanations.
- Dynamic Reshuffling: An integrated logic that shuffles the question pool for a unique experience in every attempt.
- Comprehensive Review: A detailed post-exam breakdown including correct answers and technical explanations.
- Privacy Focused: No data is stored on servers; all processing happens locally within the browser.

## Technical Implementation

- Frontend: Built with React and TypeScript for robust type safety and component-driven architecture.
- Styling: Implemented using modern Vanilla CSS with a focus on responsiveness and performance.
- State Management: Efficient use of React hooks to manage complex exam flows and user interactions.
- File Processing: Client-side JSON parsing and validation to ensure data integrity.

## JSON Format Specification

To use the platform, provide a JSON file following this structure:

```json
[
  {
    "id": 1,
    "text": "Your technical question goes here",
    "options": [
      "First option",
      "Second option",
      "Third option",
      "Fourth option"
    ],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why the first option is correct."
  }
]
```

## Credits

Developed by ceciliomgr.

- GitHub: [https://github.com/ceciliomgr](https://github.com/ceciliomgr)
- Project Repository: [https://github.com/ceciliomgr/ExamTraining](https://github.com/ceciliomgr/ExamTraining)
