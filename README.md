# Assesment App

This project is built using [Vite](https://vitejs.dev/), a fast frontend build tool that supports modern web development.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) (optional)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Navigate to the Project Directory

```bash
cd your-repo-name
```

### 3. Install Dependencies

If you're using npm:

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open Your Browser

```bash
http://localhost:5173
```

Your Vite application should now be up and running!

# Algolia Search Resources

This repository includes a utility function for performing search queries on an Algolia index based on user-provided answers. The results returned are resources that match the user's profile based on their answers.

## UserAnswers Interface

The `UserAnswers` interface defines the structure of the user input data used to perform the search query. Each property represents a specific question and its corresponding answer.

### Properties

- **`gitExperience: string`**
  Represents the user's experience with Git. This could be a descriptive value like `"Beginner"`, `"Intermediate"`, or `"Expert"`.

- **`familiarFrameworks: string[]`**
  An array of strings listing the frameworks the user is familiar with, such as `"React"`, `"Angular"`, `"Vue.js"`, etc.

- **`preferredLanguage: string`**
  The programming language the user prefers to work with, such as `"JavaScript"`, `"Python"`, `"Java"`, etc.

- **`preferredOS: string`**
  The operating system the user prefers to work on, such as `"Windows"`, `"macOS"`, `"Linux"`, etc.

- **`remoteWorkExperience: boolean`**
  A boolean indicating whether the user has experience with remote work. `true` if they do, `false` if they don't.

- **`databaseExperience: string`**
  Represents the user's experience with databases, such as `"SQL"`, `"NoSQL"`, `"MongoDB"`, etc.

- **`cloudPlatforms: string[]`**
  An array of strings listing the cloud platforms the user is experienced with, such as `"AWS"`, `"Azure"`, `"Google Cloud"`, etc.

- **`contributeOpenSource: boolean`**
  A boolean indicating whether the user contributes to open-source projects. `true` if they do, `false` if they don't.

- **`recentTechLearning: string`**
  A string describing the most recent technology the user has been learning, such as `"Docker"`, `"Kubernetes"`, `"AI/ML"`, etc.

## searchResources Function

The `searchResources` function performs a search query on the Algolia index using the user's answers as facet filters. The results returned are resources that match the user's profile based on their answers.

### API

- **Parameters:**

  - `userAnswers: UserAnswers`
    An object containing the user's answers based on the `UserAnswers` interface.

- **Returns:**
  - `Promise<Array<any>>`: A promise that resolves to an array of search results (`hits`) if the query is successful. If an error occurs during the search, it returns an empty array.

### How It Works

1. **Facet Filters Creation:**
   The function converts the user's answers into a set of facet filters. Each key-value pair in the `userAnswers` object is transformed:

   - If the value is an array, each element is mapped to a facet filter string.
   - If the value is a boolean, it's converted to `"Yes"` or `"No"`.
   - Other values are directly converted to a facet filter string.

2. **Algolia Search Query:**
   The generated facet filters are passed to the Algolia search query. The search is performed on the `algolia-recommendation-data` index.

3. **Error Handling:**
   If an error occurs during the search, it's logged to the console, and the function returns an empty array.
