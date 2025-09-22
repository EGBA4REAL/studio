import type { Level, Class, Subject, Topic } from './types';

export const levels: Level[] = [
  { id: 'primary', name: 'Primary School', description: 'Grades 1-6' },
  { id: 'secondary', name: 'Secondary School', description: 'JSS1 - SSS3' },
];

export const classes: Class[] = [
  { id: 'primary-4', name: 'Primary 4', levelId: 'primary' },
  { id: 'primary-5', name: 'Primary 5', levelId: 'primary' },
  { id: 'jss-1', name: 'JSS 1', levelId: 'secondary' },
  { id: 'jss-2', name: 'JSS 2', levelId: 'secondary' },
];

export const subjects: Subject[] = [
  { id: 'math-p4', name: 'Mathematics', classId: 'primary-4', icon: 'subject-mathematics' },
  { id: 'eng-p4', name: 'English Language', classId: 'primary-4', icon: 'subject-english' },
  { id: 'sci-p4', name: 'Basic Science', classId: 'primary-4', icon: 'subject-basic-science' },
  { id: 'math-j1', name: 'Mathematics', classId: 'jss-1', icon: 'subject-mathematics' },
  { id: 'eng-j1', name: 'English Language', classId: 'jss-1', icon: 'subject-english' },
  { id: 'comp-j1', name: 'Computer Science', classId: 'jss-1', icon: 'subject-computer-science' },
];

export const topics: Topic[] = [
  // Primary 4 Mathematics
  { id: 'topic-m4-1', subjectId: 'math-p4', week: 1, title: 'Numbers and Numeration up to 10,000', lessonContent: 'This week, we will learn about place value, counting, and writing numbers up to 10,000.', studyMaterials: [], completed: true },
  { id: 'topic-m4-2', subjectId: 'math-p4', week: 2, title: 'Addition and Subtraction of Whole Numbers', lessonContent: 'This lesson covers adding and subtracting large numbers, including borrowing and carrying over.', studyMaterials: [], completed: false },
  { id: 'topic-m4-3', subjectId: 'math-p4', week: 3, title: 'Multiplication of Whole Numbers', lessonContent: 'We will explore multiplication tables and multiplying 2-digit numbers by 2-digit numbers.', studyMaterials: [], completed: false },

  // JSS 1 Mathematics
  { id: 'topic-m1-1', subjectId: 'math-j1', week: 1, title: 'Whole Numbers and Decimal Numbers', lessonContent: `
    <h1>Understanding Whole and Decimal Numbers</h1>
    <p>This lesson introduces the concept of whole numbers and extends it to decimal numbers.</p>
    <h2>What are Whole Numbers?</h2>
    <p>Whole numbers are the basic counting numbers: 0, 1, 2, 3, and so on. They do not have fractions or decimals.</p>
    <h2>Introduction to Decimals</h2>
    <p>A decimal number is a number that includes a decimal point. For example, <strong>3.14</strong> is a decimal number.</p>
    <p>The number to the left of the decimal point is the whole number part. The number to the right is the fractional part.</p>
    <h3>Place Value in Decimals</h3>
    <p>In the number 24.75:</p>
    <ul>
      <li>2 is in the tens place.</li>
      <li>4 is in the ones place.</li>
      <li>7 is in the tenths place.</li>
      <li>5 is in the hundredths place.</li>
    </ul>
  `, studyMaterials: [], completed: true },
  { id: 'topic-m1-2', subjectId: 'math-j1', week: 2, title: 'Fractions and Percentages', lessonContent: 'This lesson explains different types of fractions and how to convert them to percentages.', studyMaterials: [], completed: true },
  { id: 'topic-m1-3', subjectId: 'math-j1', week: 3, title: 'Introduction to Algebra', lessonContent: 'Learn the basics of algebra, including variables, expressions, and simple equations.', studyMaterials: [], completed: false },
  { id: 'topic-m1-4', subjectId: 'math-j1', week: 4, title: 'Basic Geometric Shapes', lessonContent: 'This lesson introduces common geometric shapes like triangles, squares, and circles, and their properties.', studyMaterials: [], completed: false },

  // JSS 1 English
  { id: 'topic-e1-1', subjectId: 'eng-j1', week: 1, title: 'Parts of Speech', lessonContent: 'An overview of the 8 parts of speech: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.', studyMaterials: [], completed: true },
  { id: 'topic-e1-2', subjectId: 'eng-j1', week: 2, title: 'Nouns: Types and Functions', lessonContent: 'A deep dive into different types of nouns (common, proper, abstract, collective) and their roles in a sentence.', studyMaterials: [], completed: false },
];
