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
  // Primary 1 English
  { id: 'topic-eng-p1-w1', subjectId: 'eng-p1', week: 1, title: 'Phonics (animal sounds)', lessonContent: '<h1>Phonics (animal sounds)</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w2', subjectId: 'eng-p1', week: 2, title: 'Phonemics Awareness', lessonContent: '<h1>Phonemics Awareness</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w3', subjectId: 'eng-p1', week: 3, title: 'Rhyming Words', lessonContent: '<h1>Rhyming Words</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w4', subjectId: 'eng-p1', week: 4, title: 'Building Rhyming Word family', lessonContent: '<h1>Building Rhyming Word family</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w5', subjectId: 'eng-p1', week: 5, title: 'Matching of words and Figures', lessonContent: '<h1>Matching of words and Figures</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w6', subjectId: 'eng-p1', week: 6, title: 'Identification and pronunciation of words', lessonContent: '<h1>Identification and pronunciation of words</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w7', subjectId: 'eng-p1', week: 7, title: 'Mid-Term Test', lessonContent: '<h1>Mid-Term Test</h1><p>This week is for the mid-term test.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w8', subjectId: 'eng-p1', week: 8, title: 'Blending sound of letters to form words', lessonContent: '<h1>Blending sound of letters to form words</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w9', subjectId: 'eng-p1', week: 9, title: 'Phonics', lessonContent: '<h1>Phonics</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p1-w10', subjectId: 'eng-p1', week: 10, title: 'Identification and Pronunciation of names of objects', lessonContent: '<h1>Identification and Pronunciation of names of objects</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },

  // Primary 1 Mathematics
  { id: 'topic-math-p1-w1', subjectId: 'math-p1', week: 1, title: 'Whole Number', lessonContent: '<h1>Whole Number</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w2', subjectId: 'math-p1', week: 2, title: 'Whole Number 11 - 20', lessonContent: '<h1>Whole Number 11 - 20</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w3', subjectId: 'math-p1', week: 3, title: 'Counting and Writing of Numbers', lessonContent: '<h1>Counting and Writing of Numbers</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w4', subjectId: 'math-p1', week: 4, title: 'Counting of number (21 - 30)', lessonContent: '<h1>Counting of number (21 - 30)</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w5', subjectId: 'math-p1', week: 5, title: 'Identification of number from 31 - 40', lessonContent: '<h1>Identification of number from 31 - 40</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w6', subjectId: 'math-p1', week: 6, title: 'Ordering of Number 10', lessonContent: '<h1>Ordering of Number 10</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w7', subjectId: 'math-p1', week: 7, title: 'Mid-Term Test', lessonContent: '<h1>Mid-Term Test</h1><p>This week is for the mid-term test.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w8', subjectId: 'math-p1', week: 8, title: 'Identification and reading of number 6 - 9, 9 - 6', lessonContent: '<h1>Identification and reading of number 6 - 9, 9 - 6</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w9', subjectId: 'math-p1', week: 9, title: 'Addition of whole numbers', lessonContent: '<h1>Addition of whole numbers</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p1-w10', subjectId: 'math-p1', week: 10, title: 'Comparison and ordering of Number', lessonContent: '<h1>Comparison and ordering of Number</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  
  // Primary 4 English
  { id: 'topic-eng-p4-w1', subjectId: 'eng-p4', week: 1, title: 'Revision', lessonContent: '<h1>Revision</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w2', subjectId: 'eng-p4', week: 2, title: 'Speech work', lessonContent: '<h1>Speech work</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w3', subjectId: 'eng-p4', week: 3, title: 'Narration of real life story', lessonContent: '<h1>Narration of real life story</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w4', subjectId: 'eng-p4', week: 4, title: 'Structure: the using of \'can\' or \'may\'', lessonContent: '<h1>Structure: the using of \'can\' or \'may\'</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w5', subjectId: 'eng-p4', week: 5, title: 'Vocabulary on transportation', lessonContent: '<h1>Vocabulary on transportation</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w6', subjectId: 'eng-p4', week: 6, title: 'Further practice in the use of tense', lessonContent: '<h1>Further practice in the use of tense</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w7', subjectId: 'eng-p4', week: 7, title: 'Summative Test', lessonContent: '<h1>Summative Test</h1><p>This week is for the summative test.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w8', subjectId: 'eng-p4', week: 8, title: 'Good morals', lessonContent: '<h1>Good morals</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w9', subjectId: 'eng-p4', week: 9, title: 'Composition', lessonContent: '<h1>Composition</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-eng-p4-w10', subjectId: 'eng-p4', week: 10, title: 'Revision', lessonContent: '<h1>Revision</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },

  // Primary 4 Mathematics
  { id: 'topic-math-p4-w1', subjectId: 'math-p4', week: 1, title: 'Revision', lessonContent: '<h1>Revision</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w2', subjectId: 'math-p4', week: 2, title: 'Whole numbers', lessonContent: '<h1>Whole numbers</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w3', subjectId: 'math-p4', week: 3, title: 'Whole numbers skip counting', lessonContent: '<h1>Whole numbers skip counting</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w4', subjectId: 'math-p4', week: 4, title: 'Whole numbers', lessonContent: '<h1>Whole numbers</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w5', subjectId: 'math-p4', week: 5, title: 'Roman numerals', lessonContent: '<h1>Roman numerals</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w6', subjectId: 'math-p4', week: 6, title: 'Basic operations', lessonContent: '<h1>Basic operations</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w7', subjectId: 'math-p4', week: 7, title: 'Summative Test', lessonContent: '<h1>Summative Test</h1><p>This week is for the summative test.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w8', subjectId: 'math-p4', week: 8, title: 'Multiplication', lessonContent: '<h1>Multiplication</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w9', subjectId: 'math-p4', week: 9, title: 'Whole Numbers', lessonContent: '<h1>Whole Numbers</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  { id: 'topic-math-p4-w10', subjectId: 'math-p4', week: 10, title: 'Lowest common multiple & Highest common multiple', lessonContent: '<h1>Lowest common multiple & Highest common multiple</h1><p>Lesson content coming soon.</p>', studyMaterials: [], completed: false },
  
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
