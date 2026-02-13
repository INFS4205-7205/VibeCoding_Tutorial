export interface Lesson {
  id: string
  title: string
  description: string
  content: string
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export const courseData: Module[] = [
  {
    id: "module-0",
    title: "Module 0: Overview & Vibe Coding Choices",
    lessons: [
      {
        id: "course-overview",
        title: "Course Overview & Picking Your Stack",
        description: "What the course covers and tool options.",
        content: `
## Overview:
- Goal: learn how to use agents to boost how you code and ship.
- Structure: setup, working loop, build sprints, extensions, and a resource kit.

[Module 1 — Setting up the Environment](/course/module-1/tour-safety "pill-link")
[Module 2 — Working with the Agent](/course/module-2/managing-context "pill-link")

[Module 3 — Build with Agents](/course/module-3/mini-api "pill-link")
[Module 4 — Extended tools](/course/module-4/skills-basics "pill-link")
[Resources — quick links](/course/resources/useful-links "pill-link")

## Pick your vibe-coding setup
### Desktop IDE/Apps
- [Antigravity (Google)](https://antigravity.google/).
- [Cursor](https://cursor.com/).
- [OpenAI Codex](https://openai.com/codex/) - built as a standalone agent app, can access major IDEs like VS Code, Antigravity, and Cursor for editing files.
- [VS Code + extensions](https://code.visualstudio.com/) — coding agents like [GitHub Copilot](https://github.com/features/copilot), Codex, Gemini Code are available as within-app extensions.

Note: The above tools all have free plans available for use.

### Command-line/terminal based:
- [Claude Code](https://code.claude.com/docs/en/overview).
- [OpenAI Codex via CLI](https://developers.openai.com/codex/cli/).
- [Qwen-Code](https://github.com/QwenLM/qwen-code).
- [Copilot CLI](https://github.com/features/copilot/cli).

## What we use in this course:
- We demo with Antigravity and Codex Desktop.
- Pick whichever IDE/CLI fits your workflow and subscription—you can follow the same prompts in the tool you prefer.
`
      }
    ]
  },
  {
    id: "module-1",
    title: "Module 1: Getting Started",
    lessons: [
      {
        id: "tour-safety",
        title: "Setup",
        description: "UI landmarks and agent access.",
        content: `

After installing your IDE/CLI agent using links from the previous module, you'll see a workspace with a few key areas (e.g., for Antigravity, see the screenshot below).
- **Explorer (left):** where you can find files after loading your workspace/directory via the \`Open Folder\` button in the center or the top-left corner of the Home Screen.
- **Editor (center):** where opened code and files appear.
- **Agent chat (right):** where you access and talk to the Agent (\`Cmd + E\`).
![Editor Home Screen](/images/module1/workspace-home.png)

The agent manager (extended capabilities of the chat window) of Antigravity can be accessed by clicking on the \`Open Agent Manager\` button in the top-right corner of the Home Screen or via keyboard shortcut \`Cmd + E\`. **It is recommended to use the agent manager for more complex and multiple tasks.**
![Antigravity Agent Manager](/images/module1/agent-manager.png)
![Codex Agent Manager](/images/module1/codex-agent-manager.png)
The agent manager varies slightly between different providers, but the general idea is the same. You have:
- **Workspace**: where you can work in a specific directory, all prompts will be executed in this directory unless you specify otherwise. **You can open multiple workspaces and run multiple tasks in parallel.**
- **Conversation/chat window**: where you can select a workspace and talk to the agent.

Settings of the agent can be accessed by clicking on the &#9881; icon in the top-right/bottom-left corner of the Agent Manager for Antigravity/Codex, respectively.
![Agent Settings](/images/module1/agent-settings.png)
\`\`\`highlight
{
  "type": "tip",
  "title": "Stay in control",
  "content": "It is recommended to keep terminal on **'Request Review'** until you trust the workspace. Review every diff. Use @file references to limit scope."
}
\`\`\`

## Choosing your model

Both Antigravity and Codex offer multiple models. Switch based on your task complexity and your available token budget.

### Antigravity (Google):
- **Gemini 3 Pro (High/Low)**: **High** for complex reasoning/refactoring; **Low** for everyday tasks.
- **Gemini 3 Flash**: Instant responses. Best for quick syntax checks or small fixes.
- **Claude Sonnet 4.5 / (Thinking)**: Excellent coding capability. "Thinking" variants plan before writing code.
- **Claude Opus 4.5 (Thinking)**: Deepest reasoning buffer. Use for architectural design or very hard bugs.
- **GPT-OSS 120B (Medium)**: Open-weight option for experimenting with non-proprietary models.

### Codex (OpenAI):
- **GPT-5.2-Codex (Medium/High/Extra High)**: Tuned specifically for code generation. **Extra High** has the best context handling + reasoning. Use **High** by default.
- **GPT-5.2 (Medium/High/Extra High)**: General purpose reasoning. Use for non-code planning or creative writing tasks.
`
      },
      {
        id: "first-task",
        title: "Run Your First Task",
        description: "Ask → plan → run → review diff → approve, with simple examples.",
        content: `
Once you have your workspace ready, you can **start interacting with the agent**. We recommend using the **Agent Manager** for better control over the agent's tasks. Below are some examples of prompts you can try:
\`\`\`highlight
{
  "type": "tip",
  "title": "Recommended Guide for Better Agent Interaction",
  "content": "- Ask clearly\\n- Agent plans (confirm)\\n- Agent runs/edits (with approval)\\n- You review the diff/output\\n- Approve or reject"
}
\`\`\`

## Example first-to-try prompts

Prompt 1: Explain a file  
\`\`\`prompt
Open [Your File Name] and explain what it does in 5 bullets.
\`\`\`
\`\`\`toggle
{
  "title": "Example Agent reply (e.g., app/page.tsx)",
  "defaultOpen": false,
  "content": "- Renders hero with CTA\\n- Pulls feature list from features.ts\\n- Uses Tailwind classes for layout\\n- No API calls on load\\n- CTA links to /signup"
}
\`\`\`

Prompt 2: Safety check  
\`\`\`prompt
Show me the current terminal access setting and whether you need approval to run commands.
\`\`\`
\`\`\`toggle
{
  "title": "Expected Agent reply",
  "defaultOpen": false,
  "content": "Terminal access: requires approval for every executable command.\\nI will ask before running anything."
}
\`\`\`

Prompt 3: Show a diff preview  
\`\`\`prompt
Propose changing the title in README to \"Antigravity Starter\" but do not apply it yet. Show the diff only.
\`\`\`
\`\`\`toggle
{
  "title": "Expected Agent reply",
  "defaultOpen": false,
  "content": "\`\`\`diff\\n- # My Project\\n + # Antigravity Starter\\n\`\`\`"
}
\`\`\`

Prompt 4: fix a typo
\`\`\`prompt
Find a spelling mistake in README and propose a fix. Show the diff only.
\`\`\`
\`\`\`toggle
{
  "title": "Expected Agent reply (diff)",
  "defaultOpen": false,
  "content": "\`\`\`diff\\n - Instalation\\n + Installation\\n\`\`\`"
}
\`\`\`

Prompt 5: Approve and apply
If the agent proposes a diff and you're happy with it, say:  
\`\`\`prompt
Apply the proposed diff.
\`\`\`
\`\`\`toggle
{
  "title": "Outcome",
  "defaultOpen": false,
  "content": "The Agent applies and confirms. If unsure, the edits can be rejected and you can ask the agent to try again with additional instructions."
}
\`\`\`
`
      }
    ]
  },
  {
    id: "module-2",
    title: "Module 2: Use and Interpret the Agent",
    lessons: [
      {
        id: "context-basics",
        title: "Working Efficiently With the Agent",
        description: "Learn how to guide the Agent using @ references, rules, workflows, and understand the artifacts it creates.",
        content: `
\`\`\`highlight
{
  "type": "tip",
  "title": "TL;DR",
  "content": "- Use **\`@\`** to tell the Agent exactly what to work on.\\n- Add **Rules** for consistent behavior.\\n- Use **Workflows** when tasks repeat."
}
\`\`\`

## Using @ to give context
While the Agent can search through your codebase on its own, finding the *right* files in a large project is not always easy.

That is why you should **explicitly guide the Agent**. The simplest and most important tool for this is \`@\`.

\`@\` points the Agent directly to a file/directory/rule (within or outside the workspace) to include into the context.
This helps the Agent:
- focus on the right thing
- avoid unrelated files
- produce clearer plans and safer changes

Instead of writing:
\`\`\`prompt
Fix the login logic.
\`\`\`

Write:
\`\`\`prompt
Fix the login logic in @auth.ts in @workspace-name.
Only change this function.
Explain your plan before editing.
\`\`\`

What usually happens next:
- The Agent reads only \`auth.ts\` within the given workspace
- It explains what it plans to do
- It waits for your confirmation

---
\`\`\`highlight
{
  "type": "tip",
  "title": "Rules vs. Workflows",
  "content": "To avoid repeating yourself with the same instructions when running repetitive tasks, you can use **Rules** to define persistent project standards and constraints, and **Workflows** for repeatable, multi-step tasks that follow a specific sequence."
}
\`\`\`
## Rules: guiding the Agent’s behavior

Rules are **manually defined constraints** that tell the Agent *how it should behave*.

Rules are useful when you want consistency in:
- coding style
- technology stack
- safety boundaries

### What rules look like
A Rule is simply a **Markdown file** (.md) that describes constraints for the Agent.

Examples:
- Always use TypeScript
- Ask before editing files
- Only change files inside src/

### Where rules live

**Global Rules**
- Location: \`~/.gemini/GEMINI.md\`
- Applied across all workspaces

**Workspace Rules**
- Location: \`.agent/rules/\`
- Applied only to the current project

Rules files are limited to 12,000 characters.

### How rules are activated

Rules can be applied in different ways:
- **Always On**: always applied
- **Manual**: activated using an @ mention
- **Model Decision**: the Agent decides when to apply it
- **Glob-based**: applied to matching files (for example \`src/**/*.ts\`)

Rules can also reference files using \`@filename\` inside the rule itself.


## Standardizing Context with agents.md

While Rules are great for specific constraints, \`agents.md\` is the **"README for Agents"**.

It is an [open standard](https://github.com/agentsmd/agents.md) that allows you to define the high-level context of your project in a single file.
- **Location**: Root of your repository (\`/agents.md\`).
- **Purpose**: To help *any* agent (Antigravity, Cursor, Codex, etc.) understand what your project is about, how to build it, and where the key files are.
- **Benefit**: You don't need to explain the project structure every time you start a new session.

## Workflows: guiding the Agent's steps

Workflows define a **sequence of steps** for the Agent to follow.

If Rules guide *behavior*, Workflows guide *process*.

Workflows are useful for:
- repetitive tasks
- multi-step processes
- structured operations

Workflows are saved as Markdown files and can be run using a slash command.

\`\`\`prompt
/workflow-name
\`\`\`

### Agent-generated workflows
You do not always need to write workflows yourself.
You can ask the Agent to generate one for you based on what you just did.

#### Example: asking the Agent to create a workflow

\`\`\`prompt
I have just set up a Python environment for data visualization.
Create a reusable workflow for this process and name it \`setup-dataviz\`.
\`\`\`

The Agent may generate a workflow that:
- checks for Python
- creates a minimal environment
- installs only visualization libraries
- confirms readiness

You can then reuse it later by typing:
\`\`\`prompt
/setup-dataviz
\`\`\`

This is especially useful after you notice yourself repeating the same steps.

Rules and workflow can be managed through the **editor's agent panel** by clicking on the \`...\` and then \`Customizations\`.
\`\`\`toggle
{
  "title": "Rules and workflow",
  "defaultOpen": false,
  "content": "![accessing rules and workflow](/images/module1/agent-customizations1.png)![accessing rules and workflow](/images/module1/agent-customizations.png)"
}
\`\`\`

\`\`\`highlight
{
  "type": "tip",
  "title": "Codex Automations/Workflows",
  "content": "Codex provides a simple click-and-play modules (Automations) for running repetitive tasks."
}
\`\`\`
![Codex automations](/images/module1/codex_automation.png)

---

## What you may see appear automatically

As the Agent works, it may create **artifacts** to help you understand what it is doing.

### Task List
A live checklist showing what the Agent is currently working on.
This helps the Agent stay organised during complex tasks.
\`\`\`toggle
{
  "title": "Task List",
  "defaultOpen": false,
  "content": "![tasks](/images/module1/tasks.png)"
}
\`\`\`

### Implementation Plan
A proposed plan describing what files will change and how.
You can review it, leave comments, or proceed.
\`\`\`toggle
{
  "title": "Implementation Plan",
  "defaultOpen": false,
  "content": "![implementation plan](/images/module1/implementation-plan.png)"
}
\`\`\`

### Walkthrough
A short summary created after the work is finished.
It explains what changed and where.
\`\`\`toggle
{
  "title": "Walkthrough",
  "defaultOpen": false,
  "content": "![walkthrough](/images/module1/walkthrough.png)"
}
\`\`\`
These artifacts exist to keep you informed and in control.
\`\`\`highlight
{
  "type": "tip",
  "title": "You can always just hover over the contents in the artifacts to add comments to improve.",
  "content": ""
}
\`\`\`
`
      },
      {
        id: "setup-quickstart",
        title: "Environment setup",
        description: "Compare manual setup with letting the Agent prepare the environment.",
        content: `
Previously, setting up a development environment meant **manually installing everything yourself**.

That still works.

But you can also **let the Agent check and prepare the environment for you**.
\`\`\`highlight
{
  "type": "tip",
  "title": "Key idea",
  "content": "Think in terms of what you want to do next, not what tools you need."
}
\`\`\`

---

## Option 1: Manual setup (traditional way)

This is how environments were typically set up before Agents.

### Python essentials
\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install numpy pandas matplotlib
\`\`\`

Quick check:
\`\`\`bash
python - <<'PY'
import numpy, pandas, matplotlib
print("Python environment OK")
PY
\`\`\`

---

### JS / TS essentials
\`\`\`bash
node -v
npm install
npm run lint
\`\`\`

Expected result:
\`\`\`text
No errors found
\`\`\`

This approach gives you full control, but it requires you to know **what to install** in advance.

---

## Option 2: Let the Agent set up the environment

Instead of manually installing packages, you can describe **what you want to do**, and let the Agent handle the setup.

### Example task-based prompt

\`\`\`prompt
I want to visualise a dataset in Python.

Check whether a suitable environment already exists.
If not, create a minimal environment called "dataviz" using miniconda.

Only install what is necessary for data visualisation.
Confirm when the environment is ready.
\`\`\`

That’s it.

You do not need to list every package or command.

---

## What the Agent will usually do

- Check if Python and a suitable environment already exist
- Create a new minimal environment if needed
- Install only relevant libraries (for example: numpy, pandas, matplotlib)
- Confirm when the environment is ready to use

This keeps your setup:
- task-focused
- minimal
- easy to reproduce

## When to use each approach

Use **manual setup** if:
- You want full control
- You are learning how environments work

Use **Agent setup** if:
- You want to move quickly
- You care more about the task than the tooling
`
      }
    ]
  },
  {
    id: "module-3",
    title: "Module 3: Agent-Driven End-to-End Sprints",
    lessons: [
      {
        id: "academic-data-viz",
        title: "Example 1: Academic Data Visualisation App",
        description: "Build a full interactive data visualisation web app from a real dataset using only agent prompting.",
        content: `
Goal: build a small academic-style web app that visualises a real dataset.

**You will not write code manually. You will prompt the agent to do everything.**
- Downloads a real dataset programmatically
- Explains the dataset
- Displays a table preview
- Shows an interactive scatter plot
- Allows feature selection and class colouring

---
## Step 1: Prompt the Agent
\`\`\`prompt
I want to build a small academic data visualisation web app.

Requirements:
- Use Python
- Download a real dataset programmatically (use the Iris dataset from scikit-learn)
- Build a simple web app (Streamlit is acceptable)
- Show:
  1. Dataset description
  2. Table preview of the data
  3. Interactive scatter plot
- Allow the user to choose X and Y features
- Colour points by class label

Before coding:
1. Explain your plan briefly
2. List the files you will create
Then provide the full code.
\`\`\`

## Step 2: Agent Solution
The following code is the complete, runnable solution generated by the agent, written using python streamlit.
\`\`\`toggle
{
  "title": "Agent Solution (Python)",
  "defaultOpen": false,
  "content": "\`\`\`python\\nimport streamlit as st\\nimport pandas as pd\\nimport plotly.express as px\\nfrom sklearn.datasets import load_iris\\n\\n# Set page configuration\\nst.set_page_config(\\n    page_title=\\"Iris Dataset Explorer\\",\\n    page_icon=\\"🌸\\"\\n)\\n\\n# Title and introduction\\nst.title(\\"🌸 Academic Data Visualisation: Iris Dataset\\")\\nst.markdown(\\"\\"\\"\\nThis app visualises the famous **Iris dataset**, a classic benchmark in machine learning.\\nIt allows you to explore relationships between floral dimensions and species.\\n\\"\\"\\")\\n\\n# Load dataset\\n@st.cache_data\\ndef load_data():\\n    iris = load_iris()\\n    df = pd.DataFrame(data=iris.data, columns=iris.feature_names)\\n    df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)\\n    return df\\n\\ndf = load_data()\\n\\n# Dataset description (Academic Extension)\\nst.sidebar.header(\\"Dataset Context\\")\\nst.sidebar.info(\\"\\"\\"\\nThe **Iris dataset** was introduced by statistician Ronald Fisher in 1936. \\nIt is widely used in machine learning research as a baseline for classification algorithms \\nbecause it contains well-separated clusters for some species but overlaps for others.\\n\\"\\"\\")\\n\\n# Show raw data\\nif st.checkbox(\\"Show raw data table\\"):\\n    st.subheader(\\"Raw Data Preview\\")\\n    st.dataframe(df.head())\\n    st.caption(f\\"Showing first 5 rows of {len(df)} total samples.\\")\\n\\n# Feature Selection\\nst.subheader(\\"Interactive Scatter Plot\\")\\ncol1, col2 = st.columns(2)\\nwith col1:\\n    x_axis = st.selectbox(\\"Select X-axis feature\\", df.columns[:-1], index=0)\\nwith col2:\\n    y_axis = st.selectbox(\\"Select Y-axis feature\\", df.columns[:-1], index=1)\\n\\n# Normalisation (Academic Extension)\\nnormalise = st.checkbox(\\"Normalise features (0-1 scale) before plotting\\")\\n\\nplot_df = df.copy()\\nif normalise:\\n    for col in df.columns[:-1]:\\n        plot_df[col] = (plot_df[col] - plot_df[col].min()) / (plot_df[col].max() - plot_df[col].min())\\n    st.caption(\\"Note: Features have been normalised to the [0, 1] range.\\")\\n\\n# Plotting\\nfig = px.scatter(\\n    plot_df, \\n    x=x_axis, \\n    y=y_axis, \\n    color=\\"species\\",\\n    title=f\\"{x_axis} vs {y_axis}\\",\\n    template=\\"plotly_white\\",\\n    hover_data=df.columns\\n)\\n\\nst.plotly_chart(fig, use_container_width=True)\\n\`\`\`"
}
\`\`\`

## Step 3: Run and Verify
Assume the environment is setup correctly, otherwise ask the agent to install the required packages. The app can be run using the following command:
\`\`\`bash
streamlit run [filename].py
\`\`\`
![Agent generated app](/images/module3/data-viz1.png)

## Step 4: Further Modifications
If you want to add more features, you can prompt the agent to modify the app by adding more widgets and functionality.
\`\`\`prompt
I want to add more features to the app, such as:
- Add more widgets to the app to explore the dataset
- Add more visualisations of different types to the app
\`\`\`
\`\`\`video
{
  "src": "/images/module3/dataviz1.mov",
  "caption": "A quick look at the app in action"
}
\`\`\`
`
      },
      {
        id: "experiment-dashboard",
        title: "Example 2: Reproducible ML Experiment Dashboard",
        description: "Create a lightweight experiment dashboard similar to what researchers use to inspect model performance.",
        content: `
Goal: build a mini research dashboard that trains a model and visualises results.
- Loads a real dataset
- Trains a simple classifier
- Displays accuracy and confusion matrix
- Explains results in plain language

---

## Step 1: Prompt the Agent

\`\`\`prompt
Build a small reproducible machine learning experiment dashboard.

Requirements:
- Use a dataset from scikit-learn (Breast Cancer or Digits dataset)
- Train a simple classifier (Logistic Regression)
- Split data into train and test sets
- Display:
  1. Accuracy score
  2. Confusion matrix
  3. Short explanation of the results
- Build the app using Streamlit
- The code must run end to end

Before coding:
- Explain the experiment design
- Justify the dataset and model choice
Then provide the full code.
\`\`\`

## Step 2: Agent Solution
The following code is the complete, runnable solution generated by the agent.
\`\`\`toggle
{
  "title": "Agent Solution (Python)",
  "defaultOpen": false,
  "content": "\`\`\`python\\nimport streamlit as st\\nimport pandas as pd\\nimport numpy as np\\nimport plotly.figure_factory as ff\\nfrom sklearn.datasets import load_breast_cancer\\nfrom sklearn.model_selection import train_test_split\\nfrom sklearn.linear_model import LogisticRegression\\nfrom sklearn.metrics import accuracy_score, confusion_matrix\\n\\nst.set_page_config(page_title=\\"ML Experiment Dashboard\\", page_icon=\\"🧪\\")\\nst.title(\\"🧪 Reproducible ML Experiment Dashboard\\")\\nst.markdown(\\"\\"\\"\\nThis dashboard demonstrates a simple machine learning experiment: \\nTraining a **Logistic Regression** classifier on the **Breast Cancer Wisconsin dataset**.\\n\\"\\"\\")\\n\\n# Load data\\n@st.cache_data\\ndef load_data():\\n    data = load_breast_cancer()\\n    X = pd.DataFrame(data.data, columns=data.feature_names)\\n    y = pd.Series(data.target)\\n    return X, y, data.target_names\\n\\nX, y, target_names = load_data()\\n\\n# Sidebar controls (Research Extension)\\nst.sidebar.header(\\"Experiment Settings\\")\\ntest_size = st.sidebar.slider(\\n    \\"Test Set Ratio\\", \\n    min_value=0.1, \\n    max_value=0.5, \\n    value=0.2, \\n    step=0.05,\\n    help=\\"Higher ratio means less data for training, which can lead to underfitting.\\"\\n)\\n\\nst.sidebar.info(f\\"\\"\\"\\n**Split Explanation:**\\n- Training: {int((1-test_size)*100)}%\\n- Testing: {int(test_size*100)}%\\n\\nChanging this ratio affects how well the model generalizes. \\nToo little training data hurts performance; too little test data makes evaluation unreliable.\\n\\"\\"\\")\\n\\n# Experiment Execution\\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)\\n\\nmodel = LogisticRegression(max_iter=3000)\\nmodel.fit(X_train, y_train)\\ny_pred = model.predict(X_test)\\n\\n# Results\\nacc = accuracy_score(y_test, y_pred)\\ncm = confusion_matrix(y_test, y_pred)\\n\\nst.header(\\"Results\\")\\ncol1, col2 = st.columns(2)\\n\\nwith col1:\\n    st.metric(\\"Model Accuracy\\", f\\"{acc:.2%}\\")\\n\\nwith col2:\\n    st.info(\\"The model is evaluated on the unseen test set.\\")\\n\\n# Confusion Matrix\\nst.subheader(\\"Confusion Matrix\\")\\nfig = ff.create_annotated_heatmap(\\n    z=cm, \\n    x=list(target_names), \\n    y=list(target_names), \\n    colorscale='Blues',\\n    showscale=True\\n)\\nfig.update_layout(title_text='True Label vs Predicted Label', height=400)\\nst.plotly_chart(fig, use_container_width=True)\\n\\nst.caption(\\"\\"\\"\\n**Interpretation:**\\n- Diagonal elements represent correct predictions.\\n- Off-diagonal elements represent errors (False Positives/Negatives).\\n\\"\\"\\")\\n\`\`\`"
}
\`\`\`

### Step 2: Run and Verify

\`\`\`bash
streamlit run app.py
\`\`\`
![Agent generated app](/images/module3/data_viz2.png)

## Step 3: Try it Yourself

\`\`\`prompt
Extend the dashboard:
- Add a button to select the model type (Logistic Regression, Decision Tree, or Random Forest)
- Add more visualizations to compare the performance of different models
- Add a short explanation of why different models have different performance
\`\`\`
`
      },
      {
        id: "house-price-tracker-au",
        title: "Example 3: Australian House Price Tracker (Frontend Design)",
        description: "Build a beautiful conceptual dashboard UI using React and Tailwind CSS, focusing purely on frontend design with mock data.",
        content: `
Goal: Design a modern, responsive Real Estate web app.

**We will use mock data** to simulate a real-world application instead of fetching data via an API.
The prompt can be as simple as:
\`\`\`prompt
Build a House Price tracker that tracks the median house price and growth rate of the suburbs in different cities in Australia. 
Use mock data instead of fetching data from an API.
\`\`\`

or you can add additional context for better control:
\`\`\`prompt
Features:
- Sidebar with city selection (e.g., Sydney, Melbourne, Brisbane).
- Mock data for Median Price and Growth Rate.
\`\`\`

The agent will generate an implementation plan, you may choose to add comment to the plan (hover over and click on the comment icon):
![Implementation Plan](/images/module3/house_track_implementation_plan.png)

An illustration of the resulting app is shown here:
\`\`\`video
{
  "src": "/images/module3/dataviz3.mov",
  "caption": "A quick look at the house price tracker in action"
}
\`\`\`
`
      }
    ]
  },
  {
    id: "module-4",
    title: "Module 4: Extend & Connect (Overview)",
    lessons: [
      {
        id: "mcp-basics",
        title: "MCP: Giving the Agent Tools",
        description: "Understanding how to connect the Agent to your data and tools using the Model Context Protocol.",
        content: `
AI models are smart, but they may not fully understand the context of: 
- Your database schema
- Your Linear tickets
- Your internal documentation
- Your live server logs

**MCP (Model Context Protocol) is an open standard that connects and utillises tools to solve your problem.**
- **Without MCP:** You need to manually connect your data and tools to your AI models.
- **With MCP:** You can connect to external data sources (e.g., local files, databases), invoke tools such as search engines, allowing them to retrieve information and carry out tasks more effectively.
---
## How it Works (The 3 Primitives)
MCP gives the Agent three abilities:

### A. Resources (Reading)
- The Agent can **read data** from external sources.
- *Example:* Reading a log file or a database row to understand a bug.

### B. Tools (Acting)
- The Agent can **perform actions**.
- *Example:* Creating a Jira ticket or running a database query.

### C. Prompts (Templates)
- Reusable templates that help you perform specific tasks with a server.
- *Example:* A "Debug Crash" prompt that automatically gathers logs and analyzes them.

---

## Using MCP
### The MCP Store
Antigravity has a built-in **MCP Store** where you can easily install official servers.
1. Click the \`...\` menu in the **Editor's Agent panel**.
2. Select **MCP Store**.
3. Install servers like **GitHub**, **Linear**, or **MongoDB**.
![MCP Store in Antigravity](/images/module4/antigravity_mcp_servers.png)

Similarly, the MCP Server in Codex is located in the settings panel (bottom left &#9881; Settings).
![MCP Store in Codex](/images/module4/codex_mcp.png)

\`\`\`highlight
{
  "type": "tip",
  "title": "Once installed, the Agent will automatically know how to use them!",
  "content": ""
}
\`\`\`


`
      },
      {
        id: "skills-basics",
        title: "Skills Basics",
        description: "What a skill is, tiny example, and how to invoke it.",
        content: `
Skills bundle **instructions + scripts + references** the Agent can load on demand so it works with project-specific rules.

## 1. What and why
- **What:** A folder with SKILL.md (when/how to use) plus optional scripts/resources.
- **Why:** Repeatable, discoverable behaviors without re-prompting every time.
- **When:** You want consistent, reusable behavior beyond a one-off prompt.

![Skills vs MCP diagram (Created with Nano Banana)](/images/module4/skills_vs_mcp.png)

## 2. Typical Skill Directory Structure
Different IDEs have different ways of structuring/storying the skills (including global vs. workspace-specific skills), but a typical skill directory structure looks like this:
\`\`\`text
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter metadata (required)
│   │   ├── name: (required)
│   │   └── description: (required)
│   └── Markdown instructions (required)
├── agents/ (recommended)
│   └── openai.yaml - UI metadata for skill lists and chips
└── Bundled Resources (optional)
    ├── scripts/          - Executable code (Python/Bash/etc.)
    ├── references/       - Documentation intended to be loaded into context as needed
    └── assets/           - Files used in output (templates, icons, fonts, etc.)
\`\`\`
Refer to the official documentation of your specific stack for more information.

### Generate a skill with the Agent
To simplify the complexity of creating a skill, you can ask the Agent to create a skill for you (e.g., "data-cleaner"):
\`\`\`prompt
Create a new skill named "data-cleaner".
Include a Python script for cleaning CSVs (removing whitespace and normalizing headers) and a SKILL.md with usage instructions.
\`\`\`

## 3. Example Minimal SKILL.md
This is a minimal SKILL.md for a skill that cleans CSVs:
\`\`\`markdown
---
name: csv-cleaner
description: Clean CSVs by trimming whitespace and normalizing headers.
version: 1.0.0
---

# CSV Cleaner Skill
- Use scripts/clean_csv.py for consistent rules.
- Always output to cleaned/ directory.
\`\`\`

## 4. How the Agent uses a skill (3 steps)

- At the start of a conversation, the agent is aware of all available skills, including their names and descriptions.
- If the task matches a skill, the agent loads and reads the full \`SKILL.md\` to understand how to use it.
- The agent applies the skill's instructions directly while completing the task.

If the csv-cleaner skill is installed, the agent will use it to clean the CSV:
\`\`\`prompt
Clean all the CSV files in data/ and save to cleaned/. Indicate the command you run.
\`\`\`
Agent may reply:
\`\`\`agent
Skill matched: csv-cleaner.
Running: python scripts/clean_csv.py data/*.csv cleaned/
Output saved to cleaned/*.csv
\`\`\`

\`\`\`highlight
{
  "type": "tip",
  "title": "Codex provides a set of off-the-shelf skills that can be used to perform various tasks.",
  "content": ""
}
\`\`\`
![Codex Skills](/images/module4/codex_skills.png)

---

## 5. Skills vs. MCP (at a glance)
### Skills (Internal Workflow Automation)
* **Definition:** Reusable, prompt-triggered capabilities that package context and rules.
* **Best For:** Consistent, repeatable workflows inside your workspace (e.g., analysis, refactoring, report generation).
* **Key Insight:** Skills act as "macros" for the LLM, ensuring it adheres to specific conventions or style guides without needing to be retold every time.

### MCP (Model Context Protocol) (External Connectivity Standard)
* **Definition:** A standard interface for connecting the agent to external systems (databases, file stores, APIs).
* **Best For:** Tasks relying on live data, external state, or real-world actions.
* **Key Insight:** MCP solves the "context isolation" problem, allowing the agent to bridge the gap between the chat window and your actual infrastructure (GitHub, PostgreSQL, Linear, etc.).

| Feature | Skills | MCP (Model Context Protocol) |
| :--- | :--- | :--- |
| **Primary Role** | Optimization & Consistency | Connectivity & Access |
| **Context Source** | Pre-defined prompts & rules | Live external data & tools |
| **Best For** | Repeated tasks (Linting, Formatting) | Fetching info (Git, SQL, Drive) |
| **Analogy** | A specialized employee handbook | A USB-C port for AI applications |
`
      }
    ]
  },
  {
    id: "resources",
    title: "Resources",
    lessons: [
      {
        id: "useful-links",
        title: "Useful Links & Tools",
        description: "Essential resources for your vibe coding journey.",
        content: `

Here is a curated list of tools, documentation, and standards mentioned in this course.

## 🛠️ AI Code Editors & Agents
*   [**Antigravity (Google)**](https://antigravity.google/)
*   [**Cursor**](https://cursor.com/) 
*   [**OpenAI Codex**](https://openai.com/codex/) 
*   [**Claude Code**](https://code.claude.com/) 

## 🔗 Standards & Protocols
*   [**Model Context Protocol (MCP)**](https://modelcontextprotocol.io/) - The open standard for connecting AI to data and tools.
*   [**MCP GitHub Repository**](https://github.com/modelcontextprotocol) - Official specifications and SDKs.
*   [**Agents.md**](https://github.com/agentsmd/agents.md) - A proposed standard for defining agentic context in repositories.

## 📚 Documentation & Guides
*   [**Antigravity Documentation**](https://antigravity.google/docs) - Comprehensive guides for using Antigravity.
*   [**Prompt Engineering Guide**](https://www.promptingguide.ai/) - Learn how to craft better prompts for your agent.
*   [**Streamlit Documentation**](https://docs.streamlit.io/) - For building the data apps in Module 3.
*   [**Next.js Documentation**](https://nextjs.org/docs) - For the web app frameworks used in the course.
`
      }
    ]
  }
]
