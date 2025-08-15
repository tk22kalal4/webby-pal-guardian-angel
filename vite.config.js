import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        quiz: 'quiz/quiz.html',
        subjects: 'quiz/subjects.html',
        chapters: 'quiz/chapters.html',
        platforms: 'quiz/platforms.html'
      }
    }
  },
  server: {
    port: 8080,
    open: true
  }
})