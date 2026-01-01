# Not Your Grandma's Recipe App

## Project Overview

This is a full-stack application that digitizes handwritten and physical recipes using AI. It leverages Azure Document Intelligence to read handwritten recipes and OpenAI's ChatGPT to structure them into digital format.

### Key Features
- Upload images of handwritten or printed recipes
- AI-powered text extraction using Azure Document Intelligence (Form Recognizer)
- Intelligent recipe parsing and structuring using OpenAI/ChatGPT
- CRUD operations for managing recipes
- Cloud storage with Azure Cosmos DB
- Multiple frontend implementations (Angular and Next.js React)

## Architecture

### Backend (.NET/C# ASP.NET Core)
- **Location**: `/Backend`
- **Framework**: ASP.NET Core Web API
- **Language**: C#

#### Key Services
- **FormRecognizerService**: Analyzes uploaded recipe images using Azure Document Intelligence
- **OpenAIService**: Processes extracted text and structures it into proper recipe JSON format
- **CosmosDbService**: Handles database operations with Azure Cosmos DB

#### API Endpoints
- `POST /api/recipe/upload` - Upload recipe image for processing
- `GET /api/recipe` - Retrieve all recipes
- `POST /api/recipe/edit` - Update existing recipe
- `DELETE /api/recipe/{id}/{recipeId}` - Delete a recipe

#### Recipe Model
```csharp
public class Recipe {
    public string RecipeId { get; set; }
    public string id { get; set; }
    public string Name { get; set; }
    public List<string> Ingredients { get; set; }
    public List<string> Steps { get; set; }
}
```

### Frontend - Angular
- **Location**: `/frontend`
- **Framework**: Angular
- **Main Technologies**: TypeScript, Angular Material

#### Key Components
- `recipes.component.ts` - Recipe list and management
- `add-recipe-modal.component.ts` - Modal for adding new recipes
- `confirmation-dialog.component.ts` - Confirmation dialogs
- `api.service.ts` - API communication service
- `spinner-service.ts` - Loading state management

### Frontend - Next.js React (Newer Implementation)
- **Location**: `/frontend-react`
- **Framework**: Next.js 14.2.5
- **Styling**: Tailwind CSS
- **Language**: TypeScript

#### Technologies
- React 18
- Next.js App Router
- Tailwind CSS for styling
- TypeScript for type safety

## Development Setup

### Prerequisites
- .NET SDK (for backend)
- Node.js and npm (for frontend)
- Azure subscription with:
  - Document Intelligence (Form Recognizer) resource
  - OpenAI/ChatGPT API access
  - Cosmos DB instance

### Environment Configuration
The backend requires Azure API credentials for:
1. Azure Document Intelligence
2. OpenAI/ChatGPT API
3. Azure Cosmos DB connection string

### Running the Application

#### Backend
```bash
cd Backend
dotnet run
```

#### Angular Frontend
```bash
cd frontend
npm install
npm start
```
Navigate to `http://localhost:4200/`

#### Next.js React Frontend
```bash
cd frontend-react
npm install
npm run dev
```

## Project Structure
```
.
├── Backend/              # .NET Core Web API
│   ├── Controllers/      # API controllers
│   ├── Models/          # Data models
│   ├── Services/        # Business logic services
│   └── Utils/           # Utility functions
├── frontend/            # Angular application
│   └── src/
│       └── app/         # Angular components and services
├── frontend-react/      # Next.js React application
│   ├── src/
│   │   └── app/        # Next.js App Router pages
│   └── public/         # Static assets
└── package.json         # Root package configuration
```

## Key Technologies

### Backend
- ASP.NET Core
- Azure Document Intelligence SDK
- Azure OpenAI SDK
- Azure Cosmos DB SDK
- C# / .NET

### Frontend (Angular)
- Angular
- TypeScript
- Angular Material UI
- RxJS

### Frontend (Next.js)
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## Development Workflow

1. **Image Upload Flow**:
   - User uploads recipe image via frontend
   - Backend receives image and sends to Azure Document Intelligence
   - Extracted text is sent to OpenAI for structuring
   - Structured recipe is validated and stored in Cosmos DB
   - Recipe is returned to frontend for display

2. **Recipe Management**:
   - Users can view all stored recipes
   - Edit recipe details
   - Delete unwanted recipes

## Common Tasks

### Adding New Features
- Backend changes go in `/Backend` - follow ASP.NET Core patterns
- Angular changes go in `/frontend/src/app`
- Next.js changes go in `/frontend-react/src/app`

### Testing
- Backend: Use .NET testing frameworks
- Frontend Angular: `npm test` for unit tests
- Frontend React: Add test scripts as needed

### Debugging
- Backend: Use Visual Studio or VS Code with C# extensions
- Frontend: Browser DevTools, Angular DevTools, or React DevTools

## Important Notes

- This project uses AI services that require API keys and have associated costs
- Ensure proper error handling for AI service failures
- The Angular frontend appears to be the original implementation
- The Next.js React frontend is a newer alternative implementation
- Both frontends can work with the same backend API

## API Integration

The frontend applications communicate with the backend API. Ensure:
- CORS is properly configured in the backend
- API base URL is correctly set in frontend services
- Error handling is implemented for network failures

## Security Considerations

- API keys should never be committed to the repository
- Use environment variables or Azure Key Vault for secrets
- Implement proper authentication/authorization if deploying to production
- Validate and sanitize all user inputs
- Implement rate limiting for API endpoints
