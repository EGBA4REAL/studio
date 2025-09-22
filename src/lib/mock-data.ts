import type { Level, Class, Subject, Topic } from './types';

export const levels: Level[] = [
  { id: 'nursery', name: 'Nursery School', description: 'Pre-primary education' },
  { id: 'primary', name: 'Primary School', description: 'Grades 1-6' },
  { id: 'secondary', name: 'Secondary School', description: 'JSS1 - SSS3' },
];

export const classes: Class[] = [
  // Nursery
  { id: 'nursery-1', name: 'Nursery 1', levelId: 'nursery' },
  { id: 'nursery-2', name: 'Nursery 2', levelId: 'nursery' },
  { id: 'nursery-3', name: 'Nursery 3', levelId: 'nursery' },
  
  // Primary
  { id: 'primary-1', name: 'Primary 1', levelId: 'primary' },
  { id: 'primary-2', name: 'Primary 2', levelId: 'primary' },
  { id: 'primary-3', name: 'Primary 3', levelId: 'primary' },
  { id: 'primary-4', name: 'Primary 4', levelId: 'primary' },
  { id: 'primary-5', name: 'Primary 5', levelId: 'primary' },
  { id: 'primary-6', name: 'Primary 6', levelId: 'primary' },

  // Junior Secondary
  { id: 'jss-1', name: 'JSS 1', levelId: 'secondary' },
  { id: 'jss-2', name: 'JSS 2', levelId: 'secondary' },
  { id: 'jss-3', name: 'JSS 3', levelId: 'secondary' },

  // Senior Secondary
  { id: 'sss-1', name: 'SSS 1', levelId: 'secondary' },
  { id: 'sss-2', name: 'SSS 2', levelId: 'secondary' },
  { id: 'sss-3', name: 'SSS 3', levelId: 'secondary' },
];

export const subjects: Subject[] = [
  // Nursery Subjects
  { id: 'numeracy-n1', name: 'Numeracy', classId: 'nursery-1', icon: 'subject-mathematics' },
  { id: 'literacy-n1', name: 'Literacy', classId: 'nursery-1', icon: 'subject-english' },
  { id: 'numeracy-n2', name: 'Numeracy', classId: 'nursery-2', icon: 'subject-mathematics' },
  { id: 'literacy-n2', name: 'Literacy', classId: 'nursery-2', icon: 'subject-english' },
  { id: 'numeracy-n3', name: 'Numeracy', classId: 'nursery-3', icon: 'subject-mathematics' },
  { id: 'literacy-n3', name: 'Literacy', classId: 'nursery-3', icon: 'subject-english' },


  // Primary Subjects
  { id: 'math-p1', name: 'Mathematics', classId: 'primary-1', icon: 'subject-mathematics' },
  { id: 'eng-p1', name: 'English Language', classId: 'primary-1', icon: 'subject-english' },
  { id: 'math-p2', name: 'Mathematics', classId: 'primary-2', icon: 'subject-mathematics' },
  { id: 'eng-p2', name: 'English Language', classId: 'primary-2', icon: 'subject-english' },
  { id: 'math-p3', name: 'Mathematics', classId: 'primary-3', icon: 'subject-mathematics' },
  { id: 'eng-p3', name: 'English Language', classId: 'primary-3', icon: 'subject-english' },
  { id: 'math-p4', name: 'Mathematics', classId: 'primary-4', icon: 'subject-mathematics' },
  { id: 'eng-p4', name: 'English Language', classId: 'primary-4', icon: 'subject-english' },
  { id: 'sci-p4', name: 'Basic Science', classId: 'primary-4', icon: 'subject-basic-science' },
  { id: 'math-p5', name: 'Mathematics', classId: 'primary-5', icon: 'subject-mathematics' },
  { id: 'eng-p5', name: 'English Language', classId: 'primary-5', icon: 'subject-english' },
  { id: 'math-p6', name: 'Mathematics', classId: 'primary-6', icon: 'subject-mathematics' },
  { id: 'eng-p6', name: 'English Language', classId: 'primary-6', icon: 'subject-english' },

  // JSS Subjects
  { id: 'math-j1', name: 'Mathematics', classId: 'jss-1', icon: 'subject-mathematics' },
  { id: 'eng-j1', name: 'English Language', classId: 'jss-1', icon: 'subject-english' },
  { id: 'comp-j1', name: 'Computer Science', classId: 'jss-1', icon: 'subject-computer-science' },
  { id: 'math-j2', name: 'Mathematics', classId: 'jss-2', icon: 'subject-mathematics' },
  { id: 'eng-j2', name: 'English Language', classId: 'jss-2', icon: 'subject-english' },
  { id: 'math-j3', name: 'Mathematics', classId: 'jss-3', icon: 'subject-mathematics' },
  { id: 'eng-j3', name: 'English Language', classId: 'jss-3', icon: 'subject-english' },
  
  // SSS Subjects
  { id: 'math-s1', name: 'Mathematics', classId: 'sss-1', icon: 'subject-mathematics' },
  { id: 'eng-s1', name: 'English Language', classId: 'sss-1', icon: 'subject-english' },
  { id: 'math-s2', name: 'Mathematics', classId: 'sss-2', icon: 'subject-mathematics' },
  { id: 'eng-s2', name: 'English Language', classId: 'sss-2', icon: 'subject-english' },
  { id: 'math-s3', name: 'Mathematics', classId: 'sss-3', icon: 'subject-mathematics' },
  { id: 'eng-s3', name: 'English Language', classId: 'sss-3', icon: 'subject-english' },
];

export const topics: Topic[] = [
  // Primary 1 Mathematics
  { id: 'topic-m1p1-1', subjectId: 'math-p1', week: 1, title: 'Counting and Writing Numbers 1-20', lessonContent: '<h1>Learning to Count</h1><p>This lesson teaches how to count and write numbers from 1 to 20.</p>', studyMaterials: [], completed: true },
  { id: 'topic-m1p1-2', subjectId: 'math-p1', week: 2, title: 'Simple Addition up to 10', lessonContent: '<h1>Simple Addition</h1><p>Learn how to add two numbers with a sum up to 10.</p>', studyMaterials: [], completed: false },
  { id: 'topic-m1p1-3', subjectId: 'math-p1', week: 3, title: 'Simple Subtraction from 10', lessonContent: '<h1>Simple Subtraction</h1><p>Learn how to subtract a number from another, with numbers up to 10.</p>', studyMaterials: [], completed: false },

  // Primary 1 English
  { id: 'topic-e1p1-1', subjectId: 'eng-p1', week: 1, title: 'The English Alphabet (A-Z)', lessonContent: '<h1>The Alphabet</h1><p>Learn to recognize, say, and write the letters of the English alphabet.</p>', studyMaterials: [], completed: true },
  { id: 'topic-e1p1-2', subjectId: 'eng-p1', week: 2, title: 'Reading and Writing Two-letter words', lessonContent: '<h1>Two-Letter Words</h1><p>Practice reading and writing simple two-letter words like "is", "it", "in", "on", "of".</p>', studyMaterials: [], completed: false },
  { id: 'topic-e1p1-3', subjectId: 'eng-p1', week: 3, title: 'Introducing Nouns (Naming words)', lessonContent: '<h1>What is a Noun?</h1><p>Learn that nouns are words we use to name people, places, animals, and things.</p>', studyMaterials: [], completed: false },
  
  // Primary 4 Mathematics
  { id: 'topic-m4-1', subjectId: 'math-p4', week: 1, title: 'Numbers and Numeration up to 10,000', lessonContent: '<h1>Numbers up to 10,000</h1><p>This week, we will learn about place value, counting, and writing numbers up to 10,000.</p>', studyMaterials: [], completed: true },
  { id: 'topic-m4-2', subjectId: 'math-p4', week: 2, title: 'Addition and Subtraction of Whole Numbers', lessonContent: '<h1>Adding and Subtracting</h1><p>This lesson covers adding and subtracting large numbers, including borrowing and carrying over.</p>', studyMaterials: [], completed: false },
  { id: 'topic-m4-3', subjectId: 'math-p4', week: 3, title: 'Multiplication of Whole Numbers', lessonContent: '<h1>Multiplication</h1><p>We will explore multiplication tables and multiplying 2-digit numbers by 2-digit numbers.</p>', studyMaterials: [], completed: false },

  // Primary 4 English
  { id: 'topic-e4p4-1', subjectId: 'eng-p4', week: 1, title: 'Reading Comprehension: Folktales', lessonContent: '<h1>Reading Folktales</h1><p>Read and understand a short folktale, and answer questions about it.</p>', studyMaterials: [], completed: false },
  { id: 'topic-e4p4-2', subjectId: 'eng-p4', week: 2, title: 'Grammar: Verbs and Tenses', lessonContent: '<h1>Verbs and Tenses</h1><p>Learn about action words (verbs) and how they change for past, present, and future actions.</p>', studyMaterials: [], completed: false },
  { id: 'topic-e4p4-3', subjectId: 'eng-p4', week: 3, title: 'Composition: Writing a Simple Letter', lessonContent: '<h1>Letter Writing</h1><p>Learn the parts of a simple letter and practice writing one to a friend or family member.</p>', studyMaterials: [], completed: false },
  
  // Primary 4 Basic Science
  { id: 'topic-s4p4-1', subjectId: 'sci-p4', week: 1, title: 'Living and Non-Living Things', lessonContent: '<h1>Living vs. Non-Living</h1><p>Learn to identify the characteristics of living things and differentiate them from non-living things.</p>', studyMaterials: [], completed: false },
  { id: 'topic-s4p4-2', subjectId: 'sci-p4', week: 2, title: 'Our Senses', lessonContent: '<h1>The Five Senses</h1><p>Explore the five senses: sight, hearing, smell, taste, and touch.</p>', studyMaterials: [], completed: false },
  { id: 'topic-s4p4-3', subjectId: 'sci-p4', week: 3, title: 'The Solar System', lessonContent: '<h1>Our Solar System</h1><p>An introduction to the sun and the planets that orbit it.</p>', studyMaterials: [], completed: false },

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
  { id: 'topic-m1-2', subjectId: 'math-j1', week: 2, title: 'Fractions and Percentages', lessonContent: '<h1>Fractions and Percentages</h1><p>This lesson explains different types of fractions and how to convert them to percentages.</p>', studyMaterials: [], completed: true },
  { id: 'topic-m1-3', subjectId: 'math-j1', week: 3, title: 'Introduction to Algebra', lessonContent: '<h1>Intro to Algebra</h1><p>Learn the basics of algebra, including variables, expressions, and simple equations.</p>', studyMaterials: [], completed: false },
  { id: 'topic-m1-4', subjectId: 'math-j1', week: 4, title: 'Basic Geometric Shapes', lessonContent: '<h1>Geometric Shapes</h1><p>This lesson introduces common geometric shapes like triangles, squares, and circles, and their properties.</p>', studyMaterials: [], completed: false },

  // JSS 1 English
  { id: 'topic-e1-1', subjectId: 'eng-j1', week: 1, title: 'Parts of Speech', lessonContent: '<h1>Parts of Speech</h1><p>An overview of the 8 parts of speech: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.</p>', studyMaterials: [], completed: true },
  { id: 'topic-e1-2', subjectId: 'eng-j1', week: 2, title: 'Nouns: Types and Functions', lessonContent: '<h1>Types of Nouns</h1><p>A deep dive into different types of nouns (common, proper, abstract, collective) and their roles in a sentence.</p>', studyMaterials: [], completed: false },
];
