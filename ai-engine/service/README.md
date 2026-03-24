Create NestJS Project
npx @nestjs/cli new ai-engine

👉 Choose:

Package manager: npm or pnpm
📁 2. Move into project
cd ai-engine
⚙️ 3. Generate Core Structure
Config Module
npx nest g module config
npx nest g service config
Common (manual folders)
mkdir -p src/common/{decorators,guards,interceptors,utils}
🧠 4. AI Module
npx nest g module modules/ai
npx nest g service modules/ai

👉 Create provider manually:

touch src/modules/ai/ai.provider.ts
💬 5. Chat Module
npx nest g module modules/chat
npx nest g service modules/chat
npx nest g controller modules/chat

👉 DTO folder:

mkdir -p src/modules/chat/dto
📊 6. Vector Module
npx nest g module modules/vector
npx nest g service modules/vector

👉 Providers folder:

mkdir -p src/modules/vector/providers
🔍 7. RAG Module
npx nest g module modules/rag
npx nest g service modules/rag
🔐 8. Auth Module
npx nest g module modules/auth
npx nest g service modules/auth
npx nest g controller modules/auth

👉 Strategies:

mkdir -p src/modules/auth/strategies
🌱 9. ENV Setup

Install config support:

npm install @nestjs/config
🧩 10. Final Structure (after commands)
src/
├── config/
├── common/
├── modules/
│   ├── ai/
│   ├── chat/
│   ├── vector/
│   ├── rag/
│   └── auth/
⚡ Bonus (Faster One-Line Setup)

If you want almost everything quickly:

npx @nestjs/cli new ai-engine && cd ai-engine && \
npx nest g module config && \
npx nest g service config && \
npx nest g module modules/ai && \
npx nest g service modules/ai && \
npx nest g module modules/chat && \
npx nest g service modules/chat && \
npx nest g controller modules/chat && \
npx nest g module modules/vector && \
npx nest g service modules/vector && \
npx nest g module modules/rag && \
npx nest g service modules/rag && \
npx nest g module modules/auth && \
npx nest g service modules/auth && \
npx nest g controller modules/auth




Got it 👍 — since you're using pnpm and building a local AI (Ollama + RAG) system, here’s exactly what you should install.

🚀 1. Install pnpm (if not installed)
npm install -g pnpm
📦 2. Core Packages (Recommended for YOUR setup)
✅ Minimal (best starting point)
pnpm add axios better-sqlite3
👉 Why:
axios → call Ollama API
better-sqlite3 → local vector storage (fast + simple)
🧠 3. Optional (Better Vector DB)
Option A: ChromaDB
pnpm add chromadb
Option B: Qdrant client
pnpm add @qdrant/js-client-rest
🧩 4. Dev Dependencies (NestJS)
pnpm add -D @types/node
⚙️ 5. If Using NestJS Config
pnpm add @nestjs/config
🔥 6. NOT Recommended (for your use case)

❌ Don’t install:

pnpm add openai langchain @pinecone-database/pinecone

Because:

You are using Ollama (local LLM)
No need for cloud APIs
🧪 7. Test Ollama (Important)

Make sure Ollama is running:

ollama run llama3





AI Engine – Local RAG Setup (Ollama + Llama3 + NestJS)
📌 Overview

This guide explains how to build a fully local AI system using:

Ollama (Llama3)
Local embeddings
Local vector database
NestJS backend

No OpenAI. No Pinecone. Fully offline.

🚀 1. Install Requirements
Install pnpm
npm install -g pnpm
Install Ollama (Mac)
brew install ollama
🧠 2. Start Ollama
ollama serve

Open another terminal:

ollama run llama3

Exit using:

/bye
📦 3. Install Backend Dependencies
pnpm add axios better-sqlite3 @nestjs/config
📥 4. Pull Models
ollama pull llama3
ollama pull nomic-embed-text
🏗️ 5. Project Structure
src/
├── modules/
│   ├── ai/
│   ├── vector/
│   ├── rag/
│   └── chat/
🔌 6. AI Service (Ollama)
import axios from 'axios';


export async function generateResponse(prompt: string) {
  const res = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama3',
    prompt,
    stream: false,
  });


  return res.data.response;
}
🧬 7. Embedding Service
export async function createEmbedding(text: string) {
  const res = await axios.post('http://localhost:11434/api/embeddings', {
    model: 'nomic-embed-text',
    prompt: text,
  });


  return res.data.embedding;
}
🗂️ 8. Simple Vector Storage (SQLite)

Store:

text
embedding (JSON)

Search:

cosine similarity
🔍 9. RAG Flow
User Question
   ↓
Embedding
   ↓
Vector Search
   ↓
Context
   ↓
LLM (Llama3)
   ↓
Answer
💬 10. Chat Controller
@Post()
async chat(@Body('message') message: string) {
  return this.ragService.ask(message);
}
🧪 11. Test API
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Explain RAG",
  "stream": false
}'
⚠️ What NOT to Use

Do NOT install:

openai
langchain (optional)
pinecone
✅ Final Stack
Layer	Tool
LLM	Ollama (Llama3)
Embedding	nomic-embed-text
Backend	NestJS
DB	SQLite
HTTP	axios