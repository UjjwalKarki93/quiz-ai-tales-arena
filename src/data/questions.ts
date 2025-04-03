
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    category: "Art",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
    category: "Geography",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
    category: "Science",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    category: "Literature",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "What year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1931"],
    correctAnswer: "1912",
    category: "History",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which country is home to the Great Barrier Reef?",
    options: ["Brazil", "Australia", "Thailand", "Mexico"],
    correctAnswer: "Australia",
    category: "Geography",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: "Blue Whale",
    category: "Science",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "Who is known as the father of modern physics?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
    category: "Science",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Which of these is NOT a programming language?",
    options: ["Java", "Python", "Banana", "Ruby"],
    correctAnswer: "Banana",
    category: "Technology",
    difficulty: "easy"
  },
  {
    id: 11,
    question: "What is the hardest natural substance on Earth?",
    options: ["Diamond", "Platinum", "Titanium", "Quartz"],
    correctAnswer: "Diamond",
    category: "Science",
    difficulty: "easy"
  },
  {
    id: 12,
    question: "Who directed the movie 'Jurassic Park'?",
    options: ["James Cameron", "Steven Spielberg", "Christopher Nolan", "George Lucas"],
    correctAnswer: "Steven Spielberg",
    category: "Entertainment",
    difficulty: "medium"
  },
  {
    id: 13,
    question: "Which of these countries is NOT in Europe?",
    options: ["Portugal", "Greece", "Thailand", "Norway"],
    correctAnswer: "Thailand",
    category: "Geography",
    difficulty: "easy"
  },
  {
    id: 14,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
    category: "Mathematics",
    difficulty: "easy"
  },
  {
    id: 15,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["J.K. Rowling", "Harper Lee", "Ernest Hemingway", "F. Scott Fitzgerald"],
    correctAnswer: "Harper Lee",
    category: "Literature",
    difficulty: "medium"
  },
  {
    id: 16,
    question: "What is the main ingredient in guacamole?",
    options: ["Banana", "Avocado", "Cucumber", "Bell Pepper"],
    correctAnswer: "Avocado",
    category: "Food",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn",
    category: "Science",
    difficulty: "medium"
  },
  {
    id: 18,
    question: "What is the largest organ in the human body?",
    options: ["Brain", "Liver", "Skin", "Heart"],
    correctAnswer: "Skin",
    category: "Science",
    difficulty: "easy"
  },
  {
    id: 19,
    question: "Who painted 'Starry Night'?",
    options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dali"],
    correctAnswer: "Vincent van Gogh",
    category: "Art",
    difficulty: "medium"
  },
  {
    id: 20,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
    correctAnswer: "Japan",
    category: "Geography",
    difficulty: "easy"
  },
  // Additional questions would be added here to reach 100 questions
];
