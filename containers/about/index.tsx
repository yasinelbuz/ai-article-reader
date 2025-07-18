export default function AboutContainer() {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">About ReadNow</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              ReadNow is designed to help English learners improve their reading comprehension and
              vocabulary through AI-generated articles tailored to their proficiency level.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Articles are generated by AI to ensure appropriate difficulty levels</li>
              <li>Save words for later review while reading</li>
              <li>Track your reading progress</li>
              <li>Test your understanding with article quizzes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Three difficulty levels: Beginner, Intermediate, and Advanced</li>
              <li>Vocabulary tracking system</li>
              <li>Reading progress tracking</li>
              <li>Interactive quizzes</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
