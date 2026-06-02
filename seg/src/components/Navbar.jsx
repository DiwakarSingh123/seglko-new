import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import aboutBgImg from '../assets/images/seg.jpeg';
import logoImg from '../assets/images/logo.png';

const navItems = [
  { label: 'Home', hasDropdown: false },

  { label: 'About SEG', hasDropdown: true },
  { label: 'Programs', hasDropdown: true },
  { label: 'Admission', hasDropdown: true },
  { label: 'R & D', hasDropdown: true },
  { label: 'Our Institutions', hasDropdown: true },
  { label: 'Student Zone', hasDropdown: true },
  { label: 'Placements', hasDropdown: false, path: '/placements' },
  { label: 'Explore more', hasDropdown: false, path: '/explore-more' },
  { label: 'Contact us', hasDropdown: false },
];

const aboutSegItems = [
  {
    title: 'History of SEG',
    description: 'Our journey of growth & excellence',
    accent: true,
    icon: 'institution',
    path: '/history-of-seg',
  },
  {
    title: 'Mission & Vision',
    description: 'Our purpose, values & future goals',
    icon: 'target',
    path: '/mission-vision',
  },
  {
    title: 'Why Join SEG',
    description: 'Opportunities, growth & community',
    icon: 'people',
    path: '/why-join-seg',
  },
  {
    title: "Chairman's Message",
    description: 'Words of inspiration & leadership',
    icon: 'message',
    path: '/chairmans-message',
  },
];

const aboutSegHighlights = [
  { value: '20+', label: 'Years of Excellence', icon: 'cap' },
  { value: '25K+', label: 'Happy Students', icon: 'people' },
  { value: '6+', label: 'Institutions Across India', icon: 'building' },
  { value: '100+', label: 'Awards & Recognitions', icon: 'trophy' },
];

const programsMenuItems = [
  {
    title: 'Master of Technology',
    description: 'Our M.Tech program offers advanced skills in engineering, with opportunities for research and innovation.',
    accent: true,
    icon: 'gear',
    path: '/programs/mtech',
  },
  {
    title: 'Bachelor of Business Administration',
    description: 'Our BBA program is designed to equip students with the skills and knowledge needed for leadership in business.',
    icon: 'business',
    path: '/programs/bba',
  },
  {
    title: 'Master of Business Administration',
    description: 'We offer an MBA program designed to develop leadership and strategic management skills for global business.',
    icon: 'people',
    path: '/programs/mba',
  },
  {
    title: 'Bachelor in Computer Application',
    description: 'Our BCA program is focused on programming, system management, and application development in the IT industry.',
    icon: 'monitor',
    path: '/programs/bca',
  },
  
  {
    title: 'Masters in Computer Applications',
    description: 'Our MCA program equips students with expertise in software development, IT, and systems management.',
    icon: 'computer',
    path: '/programs/mca',
  },
  {
    title: 'B.Pharm',
    description: 'Our B.Pharm program offers a comprehensive education in pharmaceutical sciences, preparing students for diverse roles.',
    icon: 'capsule',
    path: '/programs/bpharm',
  },
];

const programsFeatureCards = [
  {
    title: 'M.Pharm',
    description: 'Our M.Pharm program offers in-depth knowledge in pharmaceutical sciences, preparing students for advanced careers.',
    icon: 'capsule',
  },
  {
    title: 'D.Pharma',
    description: 'Our D.Pharma program prepares students with practical skills to excel in the healthcare and pharmacy sectors.',
    icon: 'medical',
  },
  {
    title: 'Bachelor of Technology',
    description: 'Our B.Tech program provides a solid foundation in engineering, preparing you for a successful career in technology.',
    icon: 'gear',
  },
  {
    title: 'Diploma Programmes',
    description: 'Our diploma programs offer practical training and industry-relevant skills, ensuring career readiness.',
    icon: 'certificate',
  },
];

const admissionMenuItems = [
  {
    title: 'Admission Process',
    description: 'Follow our seamless process to secure your seat.',
    accent: true,
    icon: 'expand',
    path: '/admission-process',
  },
  {
    title: 'Eligibility Criteria',
    description: 'Our eligibility criteria are designed to help you understand the requirements for a successful application.',
    icon: 'user-check',
    path: '/eligibility-criteria',
  },
  {
    title: 'Fee Structure',
    description: 'Get all the information you need about our fee structure to make an informed decision about your studies.',
    icon: 'document',
    path: '/fee-structure',
  },
  {
    title: 'Management Admission Quota',
    description: 'Apply through our Management Quota for flexible admission and clear fee details.',
    icon: 'document',
    path: '/management-quota',
  },
];

const admissionHighlights = [
  { value: '4', title: 'Easy Steps', desc: 'Simple admission process', icon: 'expand' },
  { value: '100%', title: 'Transparent', desc: 'Clear & honest process', icon: 'user-check' },
  { value: '24/7', title: 'Support', desc: 'We\'re here to help you', icon: 'document' },
  { value: 'Join', title: 'SEG Family', desc: 'Shape your future with us', icon: 'cap' },
];

const institutionsData = [

  {
    title: 'Shivdan Singh Institute of Technology and Management',
    description: 'Approved by AICTE and affiliated to AKTU, Lucknow, College Code: 007',
    icon: 'institution',
    url: 'https://ssitm.in/',
  },
  {
    title: 'Saroj Institute of Technology and Management',
    description: 'Approved by AICTE and affiliated to AKTU, Lucknow, College Code: 123',
    icon: 'building',
    url: 'https://sitmlko.org/',
  },
  {
    title: 'Lucknow Institute of Pharmacy',
    description: 'Approved by Pharmacy Council of India (PCI) and affiliated to AKTU',
    icon: 'medical',
    url: 'https://seglko.org/lip/',
  },
  {
    title: 'Saroj College of Pharmacy',
    description: 'Approved by Pharmacy Council of India and affiliated to AKTU, Lucknow, College Code: 2031',
    icon: 'capsule',
    url: 'https://seglko.org/scp/',
  },
  {
    title: 'Saroj College of Engineering and Polytechnic',
    description: 'Approved by AICTE and affiliated to AKTU',
    icon: 'gear',
    url: 'https://seglko.org/scep/',
  },
  {
    title: 'Saroj College of Law',
    description: 'Affiliated to Lucknow University',
    icon: 'document',
    url: 'https://seglko.org/scl/',
  },
];

const studentZoneItems = [
  {
    title: 'Student Notice',
    description: 'Important updates and announcements for SEG students-stay informed and engaged!',
    icon: 'message',
    path: '/student-notice',
  },
];

const rdItems = [
  {
    title: 'R & D Projects',
    description: 'Explore our innovative R&D projects, driving cutting-edge research and technological advancements.',
    icon: 'bulb',
    path: '/rd-projects',
  },
  {
    title: 'Technologies Developed',
    description: "We take pride in the technologies we've developed, revolutionizing industries and enhancing everyday life.",
    icon: 'chip',
    path: '/technologies-developed',
  },
  {
    title: 'Award Winning Projects',
    description: 'Discover the groundbreaking work behind our award-winning projects, setting new standards in the field.',
    icon: 'award',
    path: '/award-winning-projects',
  },
  {
    title: 'Research & Publications',
    description: 'Explore our extensive research and publications, contributing to the advancement of knowledge and industry practices.',
    icon: 'book',
    path: '/research-publications',
  },
];

const rdMetrics = [
  { value: '50+', label: 'R&D Projects', sub: 'Innovative ideas turning into reality', icon: 'bulb' },
  { value: '30+', label: 'Technologies', sub: 'Developed for a better tomorrow', icon: 'chip' },
  { value: '15+', label: 'Awards Won', sub: 'Recognized for excellence', icon: 'award' },
  { value: '100+', label: 'Researchers', sub: 'Dedicated minds driving progress', icon: 'people' },
];

const rdBottomFeatures = [
  { title: 'Impactful Research', desc: 'Solutions that address real-world challenges.', icon: 'shield' },
  { title: 'Technology Driven', desc: 'Innovations that power industries.', icon: 'people-circle' },
  { title: 'Quality & Ethics', desc: 'Upholding the highest standards in R&D.', icon: 'document-text' },
  { title: 'Funded Initiatives', desc: 'Supported by leading govt. organizations.', icon: 'currency' },
  { title: 'Collaborative Approach', desc: 'Working together for greater impact.', icon: 'people' },
];

const admissionFeatures = [
  { title: 'Simple Process', desc: 'Hassle-free admission experience', icon: 'shield' },
  { title: 'Guided Support', desc: 'Assistance at every step', icon: 'people' },
  { title: 'Transparent Criteria', desc: 'Clear requirements and guidelines', icon: 'document' },
  { title: 'Fee Clarity', desc: 'Detailed fee structure and policies', icon: 'rupee' },
  { title: 'Merit & Fairness', desc: 'Merit-based and fair evaluation', icon: 'people' },
];

const DropdownArrow = () => (
  <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTile = ({ type }) => {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'institution':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 4L21 9.5" {...commonProps} />
          <path d="M5.5 10.5V19" {...commonProps} />
          <path d="M10 10.5V19" {...commonProps} />
          <path d="M14 10.5V19" {...commonProps} />
          <path d="M18.5 10.5V19" {...commonProps} />
          <path d="M3 20H21" {...commonProps} />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="7.5" {...commonProps} />
          <circle cx="12" cy="12" r="3.5" {...commonProps} />
          <path d="M16.5 7.5L20 4" {...commonProps} />
          <path d="M17 4H20V7" {...commonProps} />
        </svg>
      );
    case 'people':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="3" {...commonProps} />
          <circle cx="16.5" cy="8" r="2.5" {...commonProps} />
          <path d="M3.5 19C4.4 15.9 6.5 14 9 14C11.5 14 13.6 15.9 14.5 19" {...commonProps} />
          <path d="M14.5 18.5C15.1 16.3 16.7 15 18.6 15C20 15 21.2 15.8 22 17.3" {...commonProps} />
        </svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" {...commonProps} />
          <path d="M5 20C5.8 15.9 8.3 14 12 14C15.7 14 18.2 15.9 19 20" {...commonProps} />
        </svg>
      );
    case 'leaders':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8.5" r="3" {...commonProps} />
          <circle cx="17" cy="9.5" r="2.5" {...commonProps} />
          <path d="M3.5 19.5C4.3 16.2 6.4 14.5 8.9 14.5C11.4 14.5 13.5 16.2 14.3 19.5" {...commonProps} />
          <path d="M14.3 18.8C14.9 16.8 16.3 15.6 18 15.6C19.5 15.6 20.8 16.5 21.5 18.2" {...commonProps} />
        </svg>
      );
    case 'award':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 4H16V9C16 11.2 14.2 13 12 13C9.8 13 8 11.2 8 9V4Z" {...commonProps} />
          <path d="M8 5.5H5.5C5.5 8.3 6.8 10 8.8 10.6" {...commonProps} />
          <path d="M16 5.5H18.5C18.5 8.3 17.2 10 15.2 10.6" {...commonProps} />
          <path d="M12 13V18" {...commonProps} />
          <path d="M8.5 20H15.5" {...commonProps} />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L19 6V11C19 15.2 16.3 18.9 12 21C7.7 18.9 5 15.2 5 11V6L12 3Z" {...commonProps} />
          <path d="M9.5 11.5L11.2 13.2L14.8 9.6" {...commonProps} />
        </svg>
      );
    case 'collaboration':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 8.5L10 11L7.5 13.5L5 11L7.5 8.5Z" {...commonProps} />
          <path d="M16.5 10.5L19 13L16.5 15.5L14 13L16.5 10.5Z" {...commonProps} />
          <path d="M10 11L14 13" {...commonProps} />
          <path d="M7.5 13.5L10.5 16.5C12.1 18.1 14.6 18.1 16.2 16.5L19 13.7" {...commonProps} />
          <path d="M5 10.3L7.8 7.5C9.4 5.9 11.9 5.9 13.5 7.5L16.5 10.5" {...commonProps} />
        </svg>
      );
    case 'cap':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 4L21 9L12 14L3 9Z" {...commonProps} />
          <path d="M7 11.5V15C7 16.7 9.3 18 12 18C14.7 18 17 16.7 17 15V11.5" {...commonProps} />
        </svg>
      );
    case 'building':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 20V6H15V20" {...commonProps} />
          <path d="M15 20V10H19V20" {...commonProps} />
          <path d="M8 9H9" {...commonProps} />
          <path d="M11 9H12" {...commonProps} />
          <path d="M8 12H9" {...commonProps} />
          <path d="M11 12H12" {...commonProps} />
          <path d="M8 15H9" {...commonProps} />
          <path d="M11 15H12" {...commonProps} />
        </svg>
      );
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 4H16V8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8V4Z" {...commonProps} />
          <path d="M8 5.5H5.5C5.5 8.1 6.7 9.7 8.5 10.3" {...commonProps} />
          <path d="M16 5.5H18.5C18.5 8.1 17.3 9.7 15.5 10.3" {...commonProps} />
          <path d="M12 12V16.5" {...commonProps} />
          <path d="M9 20H15" {...commonProps} />
          <path d="M10 16.5H14" {...commonProps} />
        </svg>
      );
    case 'gear':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3.2" {...commonProps} />
          <path d="M19 12A7 7 0 0 0 18.9 10.9L21 9.3L19.3 6.3L16.8 7.1A7 7 0 0 0 15 6L14.6 3H9.4L9 6A7 7 0 0 0 7.2 7.1L4.7 6.3L3 9.3L5.1 10.9A7 7 0 0 0 5 12C5 12.4 5 12.8 5.1 13.1L3 14.7L4.7 17.7L7.2 16.9A7 7 0 0 0 9 18L9.4 21H14.6L15 18A7 7 0 0 0 16.8 16.9L19.3 17.7L21 14.7L18.9 13.1C19 12.8 19 12.4 19 12Z" {...commonProps} />
        </svg>
      );
    case 'business':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7V5.8C9 4.8 9.8 4 10.8 4H13.2C14.2 4 15 4.8 15 5.8V7" {...commonProps} />
          <path d="M4 8.5H20V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V8.5Z" {...commonProps} />
          <path d="M4 11.5C6.4 12.9 9.1 13.6 12 13.6C14.9 13.6 17.6 12.9 20 11.5" {...commonProps} />
        </svg>
      );
    case 'monitor':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="5" width="16" height="11" rx="1.8" {...commonProps} />
          <path d="M12 16V20" {...commonProps} />
          <path d="M8.5 20H15.5" {...commonProps} />
        </svg>
      );
    case 'computer':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="10" height="14" rx="1.8" {...commonProps} />
          <rect x="15" y="8" width="6" height="9" rx="1.3" {...commonProps} />
          <path d="M17 20H19" {...commonProps} />
        </svg>
      );
    case 'capsule':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6.5L17.5 15C19.4 16.9 19.4 20 17.5 21.9C15.6 23.8 12.5 23.8 10.6 21.9L2.1 13.4C0.2 11.5 0.2 8.4 2.1 6.5C4 4.6 7.1 4.6 9 6.5Z" {...commonProps} />
          <path d="M6 3L21 18" {...commonProps} />
        </svg>
      );
    case 'medical':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="5" width="16" height="14" rx="2" {...commonProps} />
          <path d="M9 3.8V6.2" {...commonProps} />
          <path d="M15 3.8V6.2" {...commonProps} />
          <path d="M12 9V15" {...commonProps} />
          <path d="M9 12H15" {...commonProps} />
        </svg>
      );
    case 'certificate':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="5" width="16" height="10" rx="1.8" {...commonProps} />
          <path d="M7 9H14" {...commonProps} />
          <path d="M7 12H11" {...commonProps} />
          <circle cx="16.5" cy="16.5" r="2.5" {...commonProps} />
          <path d="M15.3 18.8L14.5 21L16.5 20L18.5 21L17.7 18.8" {...commonProps} />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" {...commonProps} />
          <path d="M14 2V8H20" {...commonProps} />
          <path d="M16 13H8" {...commonProps} />
          <path d="M16 17H8" {...commonProps} />
          <path d="M10 9H8" {...commonProps} />
        </svg>
      );
    case 'expand':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3H21V9" {...commonProps} />
          <path d="M9 21H3V15" {...commonProps} />
          <path d="M21 3L14 10" {...commonProps} />
          <path d="M3 21L10 14" {...commonProps} />
        </svg>
      );
    case 'user-check':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9 15.6 16.9 14.8 16.2C14.1 15.4 13.1 15 12 15H5C3.9 15 2.9 15.4 2.2 16.2C1.4 16.9 1 17.9 1 19V21" {...commonProps} />
          <circle cx="8.5" cy="7" r="4" {...commonProps} />
          <path d="M17 11L19 13L23 9" {...commonProps} />
        </svg>
      );
    case 'rupee':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3H18" {...commonProps} />
          <path d="M6 8H18" {...commonProps} />
          <path d="M14.5 21L6 13H9C15.5 13 15.5 3 9 3" {...commonProps} />
        </svg>
      );
    case 'bulb':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C8.7 3 6 5.7 6 9C6 11.3 7.3 13.3 9 14.6V17C9 17.6 9.4 18 10 18H14C14.6 18 15 17.6 15 17V14.6C16.7 13.3 18 11.3 18 9C18 5.7 15.3 3 12 3Z" {...commonProps} />
          <path d="M10 21H14" {...commonProps} />
          <path d="M10 18.5V21" {...commonProps} />
          <path d="M14 18.5V21" {...commonProps} />
        </svg>
      );
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="7" width="10" height="10" rx="2" {...commonProps} />
          <path d="M9 7V4" {...commonProps} />
          <path d="M12 7V4" {...commonProps} />
          <path d="M15 7V4" {...commonProps} />
          <path d="M9 20V17" {...commonProps} />
          <path d="M12 20V17" {...commonProps} />
          <path d="M15 20V17" {...commonProps} />
          <path d="M7 9H4" {...commonProps} />
          <path d="M7 12H4" {...commonProps} />
          <path d="M7 15H4" {...commonProps} />
          <path d="M20 9H17" {...commonProps} />
          <path d="M20 12H17" {...commonProps} />
          <path d="M20 15H17" {...commonProps} />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H15C16.1 4 17 4.9 17 6V20H4V4Z" {...commonProps} />
          <path d="M17 6H19C20.1 6 21 6.9 21 8V20H17" {...commonProps} />
          <path d="M8 9H13" {...commonProps} />
          <path d="M8 13H13" {...commonProps} />
        </svg>
      );
    case 'people-circle':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" {...commonProps} />
          <circle cx="12" cy="10" r="3" {...commonProps} />
          <path d="M7 19C7.8 16.5 9.7 15 12 15C14.3 15 16.2 16.5 17 19" {...commonProps} />
        </svg>
      );
    case 'document-text':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" {...commonProps} />
          <path d="M14 2V8H20" {...commonProps} />
          <path d="M16 13H8" {...commonProps} />
          <path d="M16 17H8" {...commonProps} />
          <path d="M10 9H8" {...commonProps} />
        </svg>
      );
    case 'currency':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" {...commonProps} />
          <path d="M9 8H15" {...commonProps} />
          <path d="M9 12H15" {...commonProps} />
          <path d="M9 12H11C13 12 13 8 11 8" {...commonProps} />
          <path d="M13.5 16L9 12" {...commonProps} />
        </svg>
      );
    default:
      return null;
  }
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (label) => {
    if (window.innerWidth <= 1024) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 1024) return;
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    }

    function handleResize() {
      if (window.innerWidth > 1024) setMobileOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar" id="main-nav" ref={navbarRef}>
      {/* Mobile top bar - logo + hamburger */}
      <div className="navbar__mobile-bar">
        <Link to="/" className="navbar__logo-wrap" onClick={() => setMobileOpen(false)}>
          <img src={logoImg} alt="Saroj Educational Group Logo" className="navbar__logo" />
        </Link>
        <button
          type="button"
          className="navbar__hamburger"
          onClick={() => { setMobileOpen(o => !o); setActiveDropdown(null); }}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="navbar__overlay"
          onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}
        />
      )}

      {/* Mobile drawer */}
      <div className={`navbar__drawer${mobileOpen ? ' navbar__drawer--open' : ''}`}>
        <div className="navbar__drawer-header">
          <button
            type="button"
            className="navbar__drawer-close"
            onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="navbar__nav navbar__nav--open">
          {navItems.map((item, i) => (
            <li
              key={i}
              className={`navbar__item${item.label === activeDropdown ? ' navbar__item--active' : ''}`}
            >
              {item.label === 'Home' ? (
                <Link to="/" className="navbar__item-text" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                  {item.label}
                </Link>
              ) : item.label === 'Contact us' ? (
                <Link to="/contact-us" className="navbar__item-text" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                  {item.label}
                </Link>
              ) : ['Placements', 'Explore more'].includes(item.label) ? (
                <Link to={item.path} className="navbar__item-text" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                  {item.label}
                </Link>
              ) : ['About SEG', 'Programs', 'Admission', 'R & D', 'Our Institutions', 'Student Zone'].includes(item.label) ? (
                <>
                  <button
                    type="button"
                    className="navbar__item-button"
                    onClick={() => {
                      console.log("Mobile Navbar Item Clicked:", item.label);
                      setActiveDropdown(open => {
                        const next = open === item.label ? null : item.label;
                        console.log("Next Dropdown State:", next);
                        return next;
                      });
                    }}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span className="navbar__item-text">{item.label}</span>
                    <span className="navbar__item-arrow" style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><DropdownArrow /></span>
                  </button>
                  {/* Inline sub-items */}
                  {activeDropdown === item.label && (
                    <ul className="navbar__mobile-subnav">
                      {item.label === 'About SEG' && aboutSegItems.map(sub => (
                        <li key={sub.title}>
                          <Link to={sub.path} className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                            <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                            <span>{sub.title}</span>
                          </Link>
                        </li>
                      ))}
                      {item.label === 'Programs' && programsMenuItems.map(sub => (
                        <li key={sub.title}>
                          <Link to={sub.path} className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                            <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                            <span>{sub.title}</span>
                          </Link>
                        </li>
                      ))}
                      {item.label === 'Admission' && admissionMenuItems.map(sub => (
                        <li key={sub.title}>
                          <Link to={sub.path} className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                            <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                            <span>{sub.title}</span>
                          </Link>
                        </li>
                      ))}
                      {item.label === 'R & D' && rdItems.map(sub => (
                        <li key={sub.title}>
                          <Link to={sub.path} className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                            <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                            <span>{sub.title}</span>
                          </Link>
                        </li>
                      ))}
                      {item.label === 'Our Institutions' && institutionsData.map(sub => (
                        <li key={sub.title}>
                          {sub.path ? (
                            <Link to={sub.path} className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                              <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                              <span>{sub.title}</span>
                            </Link>
                          ) : (
                            <a href={sub.url} target="_blank" rel="noopener noreferrer" className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                              <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                              <span>{sub.title}</span>
                            </a>
                          )}
                        </li>
                      ))}
                      {item.label === 'Student Zone' && studentZoneItems.map(sub => (
                        <li key={sub.title}>
                          <Link to={sub.path} className="navbar__mobile-subitem" onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}>
                            <span className="navbar__mobile-subitem-icon"><IconTile type={sub.icon} /></span>
                            <span>{sub.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <span className="navbar__item-text">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar__inner">
        <Link to="/" className="navbar__logo-wrap navbar__logo-wrap--desktop" onClick={() => setMobileOpen(false)}>
          <img src={logoImg} alt="Saroj Educational Group Logo" className="navbar__logo" />
        </Link>

        <ul className={`navbar__nav${mobileOpen ? ' navbar__nav--open' : ''}`}
        >
          {navItems.map((item, i) => (
            <li
              key={i}
              className={`navbar__item${item.label === activeDropdown ? ' navbar__item--active' : ''}`}
              onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label === 'Home' ? (
                <Link to="/" className="navbar__item-text" onClick={() => setActiveDropdown(null)}>
                  {item.label}
                </Link>
              ) : item.label === 'Contact us' ? (
                <Link to="/contact-us" className="navbar__item-text" onClick={() => setActiveDropdown(null)}>
                  {item.label}
                </Link>
              ) : ['Placements', 'Explore more'].includes(item.label) ? (
                <Link to={item.path} className="navbar__item-text" onClick={() => setActiveDropdown(null)}>
                  {item.label}
                </Link>
              ) : ['About SEG', 'Programs', 'Admission', 'R & D', 'Our Institutions', 'Student Zone'].includes(item.label) ? (
                <button
                  type="button"
                  className="navbar__item-button"
                  onClick={() => {
                    if (window.innerWidth <= 1024) {
                      setActiveDropdown((open) => (open === item.label ? null : item.label));
                    }
                  }}
                  aria-expanded={activeDropdown === item.label}
                >
                  <span className="navbar__item-text">{item.label}</span>
                  <span className="navbar__item-arrow">
                    <DropdownArrow />
                  </span>
                </button>
              ) : (
                <>
                  <span className="navbar__item-text">{item.label}</span>
                  {item.hasDropdown && (
                    <span className="navbar__item-arrow">
                      <DropdownArrow />
                    </span>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {activeDropdown === 'About SEG' && (
        <div
          className="navbar__dropdown-shell"
          onMouseEnter={() => handleMouseEnter('About SEG')}
          onMouseLeave={handleMouseLeave}
        >
          <section className="about-panel" id="about-seg-panel">
            <div className="about-panel__menu">
              {aboutSegItems.map((item) => {
                const ItemTag = item.path ? Link : 'button';
                const itemProps = item.path ? { to: item.path, onClick: () => setActiveDropdown(null) } : { type: 'button' };
                return (
                  <ItemTag
                    key={item.title}
                    {...itemProps}
                    className={`about-panel__menu-item${item.accent ? ' about-panel__menu-item--accent' : ''}`}
                  >
                    <span className="about-panel__menu-icon">
                      <IconTile type={item.icon} />
                    </span>
                    <span className="about-panel__menu-copy">
                      <span className="about-panel__menu-title">{item.title}</span>
                      <span className="about-panel__menu-description">{item.description}</span>
                    </span>
                    <span className="about-panel__menu-arrow">
                      <ChevronRight />
                    </span>
                  </ItemTag>
                );
              })}
            </div>

            <div className="about-panel__content">
              <span className="about-panel__eyebrow">About SEG</span>
              <h3 className="about-panel__title">
                Empowering Minds.
                <br />
                Shaping <span>Futures.</span>
              </h3>
              <p className="about-panel__text">
                Saroj Education Group (SEG) has been at the forefront of quality education, innovation,
                and holistic development for over decades. We are committed to nurturing talent, fostering
                values, and creating future leaders.
              </p>

              <div className="about-panel__stats">
                {aboutSegHighlights.map((item) => (
                  <article key={item.label} className="about-panel__stat">
                    <span className="about-panel__stat-icon">
                      <IconTile type={item.icon} />
                    </span>
                    <strong className="about-panel__stat-value">{item.value}</strong>
                    <span className="about-panel__stat-label">{item.label}</span>
                  </article>
                ))}
              </div>

              <button type="button" className="about-panel__cta">
                Know More About SEG
                <span className="about-panel__cta-arrow">
                  <ChevronRight />
                </span>
              </button>
            </div>

            <div className="about-panel__visual">
              <div className="about-panel__image-wrap">
                <img src={aboutBgImg} alt="SEG campus" className="about-panel__image" />
              </div>

              <div className="about-panel__quote">
                <span className="about-panel__quote-mark">“</span>
                <p>
                  Our mission is to empower students with knowledge, leadership, and innovation for a
                  better tomorrow.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeDropdown === 'Programs' && (
        <div
          className="navbar__dropdown-shell"
          onMouseEnter={() => handleMouseEnter('Programs')}
          onMouseLeave={handleMouseLeave}
        >
          <section className="programs-panel" id="programs-panel">
            <div className="programs-panel__menu">
              {programsMenuItems.map((item) => {
                const ItemTag = item.path ? Link : 'button';
                const itemProps = item.path ? { to: item.path, onClick: () => setActiveDropdown(null) } : { type: 'button' };
                return (
                  <ItemTag
                    key={item.title}
                    {...itemProps}
                    className={`programs-panel__menu-item${item.accent ? ' programs-panel__menu-item--accent' : ''}`}
                  >
                    <span className="programs-panel__menu-icon">
                      <IconTile type={item.icon} />
                    </span>
                    <span className="programs-panel__menu-copy">
                      <span className="programs-panel__menu-title">{item.title}</span>
                      <span className="programs-panel__menu-description">{item.description}</span>
                    </span>
                    <span className="programs-panel__menu-arrow">
                      <ChevronRight />
                    </span>
                  </ItemTag>
                );
              })}
            </div>

            <div className="programs-panel__main">
              <div className="programs-panel__hero">
                <div className="programs-panel__intro">
                  <span className="programs-panel__eyebrow">About Programs</span>
                  <h3 className="programs-panel__title">
                    Explore Our
                    <br />
                    <span>Programs</span>
                  </h3>
                  <p className="programs-panel__text">
                    Discover a wide range of programs designed to build your skills, expand your
                    knowledge, and shape your future.
                  </p>
                </div>

                <div className="programs-panel__visual">
                  <img src={aboutBgImg} alt="SEG programs campus" className="programs-panel__image" />
                </div>
              </div>

              <div className="programs-panel__cards">
                {programsFeatureCards.map((item) => (
                  <article key={item.title} className="programs-panel__card">
                    <span className="programs-panel__card-icon">
                      <IconTile type={item.icon} />
                    </span>
                    <div className="programs-panel__card-copy">
                      <h4 className="programs-panel__card-title">{item.title}</h4>
                      <p className="programs-panel__card-text">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {activeDropdown === 'Admission' && (
        <div
          className="navbar__dropdown-shell"
          onMouseEnter={() => handleMouseEnter('Admission')}
          onMouseLeave={handleMouseLeave}
        >
          <section className="admission-panel" id="admission-panel">
            <div className="admission-panel__top">
              <div className="admission-panel__menu">
                {admissionMenuItems.map((item, index) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={() => setActiveDropdown(null)}
                    className={`admission-panel__menu-item${item.accent ? ' admission-panel__menu-item--accent' : ''} ${index === 1 ? 'color-green' : index === 2 ? 'color-purple' : index === 3 ? 'color-blue' : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="admission-panel__menu-icon">
                      <IconTile type={item.icon} />
                    </span>
                    <span className="admission-panel__menu-copy">
                      <span className="admission-panel__menu-title">{item.title}</span>
                      <span className="admission-panel__menu-description">{item.description}</span>
                    </span>
                    <span className="admission-panel__menu-arrow">
                      <ChevronRight />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="admission-panel__content">
                <span className="admission-panel__eyebrow">ADMISSIONS</span>
                <h3 className="admission-panel__title">
                  Begin Your Journey
                  <br />
                  With <span>SEG</span>
                </h3>
                <p className="admission-panel__text">
                  Follow our seamless process to secure your seat and begin your academic journey with us.
                  We're here to guide you every step of the way.
                </p>

                <div className="admission-panel__stats">
                  {admissionHighlights.map((item, idx) => (
                    <article key={item.title} className="admission-panel__stat">
                      <span className={`admission-panel__stat-icon ${idx === 1 ? 'color-green' : idx === 2 ? 'color-blue' : idx === 3 ? 'color-orange' : 'color-purple'}`}>
                        <IconTile type={item.icon} />
                      </span>
                      <strong className={`admission-panel__stat-value ${idx === 1 ? 'text-green' : idx === 2 ? 'text-blue' : idx === 3 ? 'text-orange' : 'text-purple'}`}>{item.value}</strong>
                      <span className="admission-panel__stat-title">{item.title}</span>
                      <span className="admission-panel__stat-desc">{item.desc}</span>
                    </article>
                  ))}
                </div>

                <Link to="/contact-us" className="admission-panel__cta">
                  Start Your Admission
                  <span className="admission-panel__cta-arrow">
                    <ChevronRight />
                  </span>
                </Link>
              </div>

              <div className="admission-panel__visual">
                <div className="admission-panel__image-wrap">
                  <img src={aboutBgImg} alt="SEG campus" className="admission-panel__image" />
                </div>

                <div className="admission-panel__quote">
                  <span className="admission-panel__quote-mark">“</span>
                  <p>
                    Follow our seamless process to secure your seat and begin your academic journey with us.
                  </p>
                </div>
              </div>
            </div>

            <div className="admission-panel__bottom">
              {admissionFeatures.map((feature, i) => (
                <div className="admission-panel__feature" key={i}>
                  <div className="admission-panel__feature-icon">
                    <IconTile type={feature.icon} />
                  </div>
                  <div className="admission-panel__feature-copy">
                    <span className="admission-panel__feature-title">{feature.title}</span>
                    <span className="admission-panel__feature-desc">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      {activeDropdown === 'Our Institutions' && (
        <div
          className="navbar__dropdown-shell"
          onMouseEnter={() => handleMouseEnter('Our Institutions')}
          onMouseLeave={handleMouseLeave}
        >
          <section className="institutions-panel" id="institutions-panel">
            <div className="institutions-panel__top">
              <div className="institutions-panel__grid">
                {institutionsData.map((item, index) => (
                  item.path ? (
                    <Link
                      key={index}
                      to={item.path}
                      className="institutions-panel__item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="institutions-panel__icon">
                        <IconTile type={item.icon} />
                      </span>
                      <div className="institutions-panel__copy">
                        <h4 className="institutions-panel__name">{item.title}</h4>
                        <p className="institutions-panel__desc">{item.description}</p>
                      </div>
                      <span className="institutions-panel__arrow">
                        <ChevronRight />
                      </span>
                    </Link>
                  ) : (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="institutions-panel__item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="institutions-panel__icon">
                        <IconTile type={item.icon} />
                      </span>
                      <div className="institutions-panel__copy">
                        <h4 className="institutions-panel__name">{item.title}</h4>
                        <p className="institutions-panel__desc">{item.description}</p>
                      </div>
                      <span className="institutions-panel__arrow">
                        <ChevronRight />
                      </span>
                    </a>
                  )
                ))}
              </div>

              <div className="institutions-panel__visual">
                <div className="institutions-panel__image-wrap">
                  <img src={aboutBgImg} alt="SEG Campus" className="institutions-panel__image" />
                </div>
                <div className="institutions-panel__quote">
                  <span className="institutions-panel__quote-mark">“</span>
                  <p>Excellence in education across all our specialized campuses.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {activeDropdown === 'Student Zone' && (
        <div
          className="navbar__dropdown-shell"
          onMouseEnter={() => handleMouseEnter('Student Zone')}
          onMouseLeave={handleMouseLeave}
        >
          <section className="student-zone-panel" id="student-zone-panel">
            <div className="student-zone-panel__top">
              <div className="student-zone-panel__grid">
                {studentZoneItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="student-zone-panel__item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="student-zone-panel__icon">
                      <IconTile type={item.icon} />
                    </span>
                    <div className="student-zone-panel__copy">
                      <h4 className="student-zone-panel__name">{item.title}</h4>
                      <p className="student-zone-panel__desc">{item.description}</p>
                    </div>
                    <span className="student-zone-panel__arrow">
                      <ChevronRight />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="student-zone-panel__visual">
                <div className="student-zone-panel__image-wrap">
                  <img src={aboutBgImg} alt="Student Zone" className="student-zone-panel__image" />
                </div>
                <div className="student-zone-panel__quote">
                  <span className="student-zone-panel__quote-mark">“</span>
                  <p>Stay updated with the latest news and announcements.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {activeDropdown === 'R & D' && (
        <div
          className="navbar__dropdown-shell"
          onMouseEnter={() => handleMouseEnter('R & D')}
          onMouseLeave={handleMouseLeave}
        >
          <section className="rd-panel" id="rd-panel">
            <div className="rd-panel__shell">
              <div className="rd-panel__top">
                <div className="rd-panel__menu">
                  {rdItems.map((item, index) => {
                    const iconColors = ['orange', 'green', 'purple', 'blue'];
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className={`rd-panel__menu-item${index === 0 ? ' rd-panel__menu-item--accent' : ''}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className={`rd-panel__menu-icon rd-panel__menu-icon--${iconColors[index]}`}>
                          <IconTile type={item.icon} />
                        </span>
                        <div className="rd-panel__menu-copy">
                          <h4 className="rd-panel__menu-title">{item.title}</h4>
                          <p className="rd-panel__menu-desc">{item.description}</p>
                        </div>
                        <span className="rd-panel__menu-arrow">
                          <ChevronRight />
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="rd-panel__content">
                  <span className="rd-panel__eyebrow">R & D AT SEG</span>
                  <h3 className="rd-panel__title">
                    Driving Innovation.
                    <br />
                    Creating <span>Impact.</span>
                  </h3>
                  <p className="rd-panel__text">
                    At Saroj Educational Group, we are committed to fostering a culture of research and innovation. Our R & D initiatives focus on solving real-world challenges and creating technologies that make a difference.
                  </p>

                  <div className="rd-panel__metrics">
                    {rdMetrics.map((item, idx) => {
                      const metricColors = ['blue', 'green', 'purple', 'orange'];
                      const color = metricColors[idx];
                      return (
                        <article key={idx} className="rd-panel__metric">
                          <span className={`rd-panel__metric-icon rd-panel__metric-icon--${color}`}>
                            <IconTile type={item.icon} />
                          </span>
                          <strong className={`rd-panel__metric-value rd-panel__metric-value--${color}`}>{item.value}</strong>
                          <span className="rd-panel__metric-label">{item.label}</span>
                          <span className="rd-panel__metric-sub">{item.sub}</span>
                        </article>
                      );
                    })}
                  </div>

                  <Link to="/rd-projects" className="rd-panel__cta" onClick={() => setActiveDropdown(null)}>
                    Explore Our Innovations
                    <span className="rd-panel__cta-arrow">
                      <ChevronRight />
                    </span>
                  </Link>
                </div>

                <div className="rd-panel__visual">
                  <div className="rd-panel__image-wrap">
                    <img src={aboutBgImg} alt="R & D Excellence" className="rd-panel__image" />
                  </div>
                  <div className="rd-panel__quote">
                    <span className="rd-panel__quote-mark">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 8.44772 10.4647 8 11.017 8H14.017C14.5693 8 15.017 7.55228 15.017 7V4C15.017 3.44772 14.5693 3 14.017 3H11.017C8.25558 3 6.017 5.23858 6.017 8V15C6.017 18.3137 8.70329 21 12.017 21H14.017Z" /></svg>
                    </span>
                    <p>We are committed to pushing boundaries through research, innovation, and impactful technologies.</p>
                  </div>
                </div>
              </div>

              <div className="rd-panel__bottom">
                {rdBottomFeatures.map((feature, i) => (
                  <div className="rd-panel__feature" key={i}>
                    <div className="rd-panel__feature-icon">
                      <IconTile type={feature.icon} />
                    </div>
                    <div className="rd-panel__feature-copy">
                      <span className="rd-panel__feature-title">{feature.title}</span>
                      <span className="rd-panel__feature-desc">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </nav>
  );
}
