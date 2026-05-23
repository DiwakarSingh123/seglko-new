import facultyBg from '../assets/images/seg.jpeg';
import aboutBg from '../assets/images/about-bg.png';
import institutionsBg from '../assets/images/seg.jpeg';
import campusBg from '../assets/images/seg.jpeg';

export const facultyData = {
    // Featured Faculty
    1: {
        id: 1,
        name: 'Dr. Rajeev Kumar',
        role: 'Professor & Dean (Academics)',
        dept: 'Mechanical Engineering',
        edu: 'PhD, IIT Kanpur',
        exp: '22+ Years',
        tags: ['Thermal Engineering', 'Energy Systems'],
        image: facultyBg,
        linkedin: 'https://linkedin.com',
        email: 'rajeev.kumar@seg.edu.in',
        phone: '+91 98765 43210',
        office: 'Academic Block A, Room 102',
        bio: 'Dr. Rajeev Kumar is a distinguished academician and researcher with over two decades of experience in Mechanical Engineering. His research focuses on sustainable energy systems, heat transfer enhancement, and clean energy technologies. He has published over 40 research articles in reputed international journals and guided several PhD and M.Tech scholars.',
        teaching: ['Thermodynamics', 'Heat & Mass Transfer', 'Renewable Energy Systems', 'Advanced Fluid Mechanics'],
        research: [
            { title: 'Thermal performance analysis of hybrid solar-biomass drying systems', journal: 'International Journal of Green Energy, 2024' },
            { title: 'Computational study of nanofluid flow in microchannels', journal: 'Journal of Heat Transfer, 2023' },
            { title: 'Experimental investigation of phase change materials in thermal storage', journal: 'Applied Thermal Engineering, 2022' }
        ],
        achievements: [
            'Best Researcher Award, SEG Excellence Awards 2024',
            'Sponsorship Grant of ₹15 Lakhs from DST for Solar Energy Research',
            'Keynote Speaker at International Conference on Thermal Sciences (ICTS 2023)'
        ]
    },
    2: {
        id: 2,
        name: 'Dr. Neha Sharma',
        role: 'Associate Professor',
        dept: 'Computer Science Engineering',
        edu: 'PhD, IIIT Hyderabad',
        exp: '12+ Years',
        tags: ['AI & Machine Learning', 'Data Science'],
        image: aboutBg,
        linkedin: 'https://linkedin.com',
        email: 'neha.sharma@seg.edu.in',
        phone: '+91 98765 43211',
        office: 'Tech Hub, Room 304',
        bio: 'Dr. Neha Sharma specializes in Artificial Intelligence and Machine Learning. Her work primarily deals with Natural Language Processing, computer vision, and deep learning models for healthcare analytics. She actively collaborates with industry partners to implement AI solutions and holds two patents in intelligent systems.',
        teaching: ['Machine Learning', 'Deep Learning', 'Data Structures & Algorithms', 'Artificial Intelligence'],
        research: [
            { title: 'Transformers for clinical text summarization and diagnosis assistance', journal: 'IEEE Transactions on Artificial Intelligence, 2024' },
            { title: 'Real-time object detection in low-light environments using CNNs', journal: 'Computer Vision & Image Understanding, 2023' }
        ],
        achievements: [
            'Young Scientist Award 2023 by State Science & Technology Council',
            'Published 20+ papers in high-impact IEEE and Springer journals',
            'Organized 5-day National Workshop on Deep Learning Foundations'
        ]
    },
    3: {
        id: 3,
        name: 'Dr. Amit Verma',
        role: 'Professor',
        dept: 'Electrical Engineering',
        edu: 'PhD, NIT Allahabad',
        exp: '18+ Years',
        tags: ['Power Systems', 'Smart Grids'],
        image: institutionsBg,
        linkedin: 'https://linkedin.com',
        email: 'amit.verma@seg.edu.in',
        phone: '+91 98765 43212',
        office: 'Academic Block B, Room 205',
        bio: 'Dr. Amit Verma has extensive research background in smart grids, integration of renewable energy sources, and power system stability. He is a senior member of IEEE and serves as a reviewer for multiple international power engineering journals. He is committed to preparing graduates for the transitioning energy industry.',
        teaching: ['Power System Analysis', 'Smart Grid Technologies', 'Control Systems', 'Electrical Machines'],
        research: [
            { title: 'Decentralized control strategies for microgrids with high PV penetration', journal: 'IEEE Transactions on Smart Grid, 2024' },
            { title: 'Optimization of battery energy storage systems in distribution networks', journal: 'International Journal of Electrical Power & Energy Systems, 2023' }
        ],
        achievements: [
            'Best Paper Award, IEEE SmartGridComm 2023',
            'Consultancy project on Grid Integration for State Power Corporation',
            'Outstanding Faculty Mentor Recognition, 2022'
        ]
    },
    4: {
        id: 4,
        name: 'Dr. Pooja Singh',
        role: 'Associate Professor',
        dept: 'Pharmacy',
        edu: 'PhD, BITS Pilani',
        exp: '10+ Years',
        tags: ['Pharmacology', 'Drug Delivery'],
        image: campusBg,
        linkedin: 'https://linkedin.com',
        email: 'pooja.singh@seg.edu.in',
        phone: '+91 98765 43213',
        office: 'Pharmacy Lab Wing, Office 12',
        bio: 'Dr. Pooja Singh is an active researcher in pharmacology and targeted drug delivery systems. Her laboratory focuses on developing nanocarriers for cancer therapy and evaluating herbal formulations for metabolic disorders. She is the recipient of several national research fellowships.',
        teaching: ['Advanced Pharmacology', 'Biopharmaceutics', 'Novel Drug Delivery Systems', 'Toxicology'],
        research: [
            { title: 'Polymeric nanoparticles for targeted chemotherapy delivery: In-vitro evaluation', journal: 'Journal of Controlled Release, 2024' },
            { title: 'Phytochemical screening and pharmacological evaluation of native medicinal plants', journal: 'Phytomedicine, 2023' }
        ],
        achievements: [
            'CSIR Research Fellowship recipient during doctoral studies',
            'Granted Indian Patent for Nanostructured Lipid Carrier formulation',
            'Best Oral Presentation, National Pharmacy Congress 2023'
        ]
    },
    5: {
        id: 5,
        name: 'Dr. Vikram Seth',
        role: 'Professor',
        dept: 'Management Studies',
        edu: 'PhD, FMS Delhi',
        exp: '25+ Years',
        tags: ['Strategic Management', 'Leadership'],
        image: aboutBg,
        linkedin: 'https://linkedin.com',
        email: 'vikram.seth@seg.edu.in',
        phone: '+91 98765 43214',
        office: 'Management Block, Room 401',
        bio: 'Dr. Vikram Seth brings a wealth of academic and corporate consulting experience. His areas of expertise include strategic planning, organizational behavior, leadership development, and corporate governance. He has designed and delivered numerous Executive Development Programs for top-tier companies.',
        teaching: ['Strategic Management', 'Organizational Behavior', 'Leadership & Ethics', 'Corporate Governance'],
        research: [
            { title: 'Digital transformation strategies in traditional manufacturing firms', journal: 'Harvard Business Review (Co-authored Case Study), 2024' },
            { title: 'Impact of leadership styles on employee retention during remote work transition', journal: 'Journal of Business Research, 2023' }
        ],
        achievements: [
            'Corporate Consultant to 10+ Fortune 500 companies in India',
            'Author of the textbook "Modern Strategic Management: Cases and Concepts"',
            'Lifetime Achievement Award in Business Education, Management Association 2023'
        ]
    },

    // Deans
    6: {
        id: 6,
        name: 'Dr. Nirupma Gupta',
        role: 'Dean',
        dept: 'Sharda School of Medical Sciences & Research',
        edu: 'MD, MBBS',
        exp: '20+ Years',
        tags: ['Medical Science', 'Clinical Research'],
        image: aboutBg,
        linkedin: 'https://linkedin.com',
        email: 'nirupma.gupta@seg.edu.in',
        phone: '+91 98765 43215',
        office: 'Medical Sciences Block, Dean Office',
        bio: 'Dr. Nirupma Gupta is a prominent administrator and clinical researcher in medical sciences. Under her leadership, the Sharda School of Medical Sciences has advanced its clinical facilities, integrated modern simulation-based learning, and significantly expanded its community healthcare outreach programs.',
        teaching: ['Clinical Anatomy', 'Research Methodology', 'Hospital Administration'],
        research: [
            { title: 'Community health assessment and digital screening in rural populations', journal: 'Indian Journal of Community Medicine, 2024' }
        ],
        achievements: [
            'Award for Excellence in Medical Administration, Healthcare India 2024',
            'Pioneered the Mobile Health Clinic initiative reaching over 50 villages'
        ]
    },
    7: {
        id: 7,
        name: 'Prof. (Dr.) Ritu S. Sood',
        role: 'Dean',
        dept: 'Sharda School of Media, Film and Entertainment',
        edu: 'PhD in Mass Communication',
        exp: '18+ Years',
        tags: ['Media Studies', 'Digital Journalism'],
        image: institutionsBg,
        linkedin: 'https://linkedin.com',
        email: 'ritu.sood@seg.edu.in',
        phone: '+91 98765 43216',
        office: 'Media block, Dean Office',
        bio: 'Prof. (Dr.) Ritu S. Sood has extensive experience in media education and television production. Her focus is on digital media transition, media ethics, and collaborative film productions. She has successfully established industrial studio collaborations for student internships.',
        teaching: ['Digital Journalism', 'Media Ethics & Laws', 'Film Studies'],
        research: [
            { title: 'The impact of social media algorithms on public discourse and news consumption', journal: 'Journal of Media and Communication, 2023' }
        ],
        achievements: [
            'Designed and launched integrated media studios in campus',
            'Jury member for National Student Film Festivals 2022 and 2023'
        ]
    },
    8: {
        id: 8,
        name: 'Prof. (Dr.) Dolly Wattal Dhar',
        role: 'Dean',
        dept: 'Sharda School of Agricultural Sciences',
        edu: 'PhD in Agronomy',
        exp: '24+ Years',
        tags: ['Sustainable Agriculture', 'Bio-fertilizers'],
        image: campusBg,
        linkedin: 'https://linkedin.com',
        email: 'dolly.dhar@seg.edu.in',
        phone: '+91 98765 43217',
        office: 'Agriculture Sciences Block, Dean Office',
        bio: 'Prof. (Dr.) Dolly Wattal Dhar is a leading researcher in crop nutrition and bio-fertilizer development. She works closely with agricultural extension programs to educate regional farmers on sustainable crop cultivation and soil health management.',
        teaching: ['Soil Chemistry & Fertility', 'Principles of Agronomy', 'Sustainable Agriculture Techniques'],
        research: [
            { title: 'Long-term effects of cyanobacterial bio-fertilizers on rice crop yield and soil biology', journal: 'Soil Biology and Biochemistry, 2024' }
        ],
        achievements: [
            'Fellow of the National Academy of Agricultural Sciences (NAAS)',
            'Developed 3 bio-fertilizer formulations licensed to agro-industries'
        ]
    },
    9: {
        id: 9,
        name: 'Prof. (Dr.) Debasis Mallik',
        role: 'Dean',
        dept: 'Sharda School of Business Studies',
        edu: 'PhD, MBA',
        exp: '21+ Years',
        tags: ['Corporate Finance', 'Global Business'],
        image: facultyBg,
        linkedin: 'https://linkedin.com',
        email: 'debasis.mallik@seg.edu.in',
        phone: '+91 98765 43218',
        office: 'Business Studies Block, Dean Office',
        bio: 'Prof. (Dr.) Debasis Mallik specializes in financial markets, investment analysis, and corporate finance. He is an advisor to several financial startups and has initiated several student entrepreneurship incubator programs on campus.',
        teaching: ['Financial Management', 'Investment & Portfolio Analysis', 'Corporate Valuation'],
        research: [
            { title: 'Empirical analysis of ESG rating impacts on corporate stock volatility in emerging markets', journal: 'Journal of Corporate Finance, 2024' }
        ],
        achievements: [
            'Best Business Educator Award, AIMS International',
            'Spearheaded the campus Startup Incubator and Angel Funding Network'
        ]
    },
    10: {
        id: 10,
        name: 'Prof. (Dr.) Rishikesh Dave',
        role: 'Dean',
        dept: 'Sharda School of Law',
        edu: 'LLD, LLM',
        exp: '17+ Years',
        tags: ['Constitutional Law', 'Human Rights'],
        image: campusBg,
        linkedin: 'https://linkedin.com',
        email: 'rishikesh.dave@seg.edu.in',
        phone: '+91 98765 43219',
        office: 'Law School Block, Dean Office',
        bio: 'Prof. (Dr.) Rishikesh Dave is a recognized authority on Constitutional Law and International Human Rights. He has published extensively on judicial activism, administrative law, and legal education reform in India.',
        teaching: ['Constitutional Law', 'Administrative Law', 'Human Rights Jurisprudence'],
        research: [
            { title: 'Balancing national security and digital privacy rights: A comparative constitutional analysis', journal: 'Indian Law Review, 2023' }
        ],
        achievements: [
            'Member of National Legal Reforms Committee (Advisory capacity)',
            'Organized National Moot Court Competition with participation from 50+ Law Schools'
        ]
    },
    11: {
        id: 11,
        name: 'Prof. (Dr.) Pallavi Gupta',
        role: 'Dean',
        dept: 'Sharda School of Engineering & Science',
        edu: 'PhD in Nanotechnology',
        exp: '16+ Years',
        tags: ['Nanomaterials', 'Materials Science'],
        image: aboutBg,
        linkedin: 'https://linkedin.com',
        email: 'pallavi.gupta@seg.edu.in',
        phone: '+91 98765 43220',
        office: 'Engineering Block, Dean Office',
        bio: 'Prof. (Dr.) Pallavi Gupta conducts pioneering research in nanotechnology, specifically synthesis of metallic nanoparticles for bio-sensing and eco-friendly water purification. She holds international research collaborations in Japan and Germany.',
        teaching: ['Nanotechnology & Applications', 'Materials Characterization', 'Engineering Physics'],
        research: [
            { title: 'Green synthesis of graphene-metal oxide nanocomposites for heavy metal adsorption', journal: 'Journal of Hazardous Materials, 2024' }
        ],
        achievements: [
            'DST-FASTTRACK Young Scientist Grant Recipient',
            'Over 35 publications with 1200+ citations in international journals'
        ]
    },
    12: {
        id: 12,
        name: 'Prof. (Dr.) Geetha Ganesan',
        role: 'Dean',
        dept: 'Sharda School of Computing Science & Engineering',
        edu: 'PhD, MS',
        exp: '19+ Years',
        tags: ['Cybersecurity', 'Cloud Computing'],
        image: institutionsBg,
        linkedin: 'https://linkedin.com',
        email: 'geetha.ganesan@seg.edu.in',
        phone: '+91 98765 43221',
        office: 'Computing Science Block, Dean Office',
        bio: 'Prof. (Dr.) Geetha Ganesan is an expert in cloud security infrastructure and digital forensics. She guides multiple government-funded cybersecurity awareness and research projects, preparing students for highly demanded careers in data security.',
        teaching: ['Cryptography & Network Security', 'Cloud Computing Architectures', 'Cyber Forensics'],
        research: [
            { title: 'A blockchain-based zero-trust security framework for edge-cloud networks', journal: 'Journal of Systems and Software, 2024' }
        ],
        achievements: [
            'Consultant to State Cyber Cell for security audit framework',
            'Introduced Industry-collaborated Cloud Security Lab with AWS'
        ]
    },
    13: {
        id: 13,
        name: 'Prof. (Dr.) Anviti Gupta',
        role: 'Professor & Dean',
        dept: 'Sharda School of Humanities and Social Sciences',
        edu: 'PhD in Psychology',
        exp: '21+ Years',
        tags: ['Clinical Psychology', 'Cognitive Behavior'],
        image: facultyBg,
        linkedin: 'https://linkedin.com',
        email: 'anviti.gupta@seg.edu.in',
        phone: '+91 98765 43222',
        office: 'Humanities Block, Dean Office',
        bio: 'Prof. (Dr.) Anviti Gupta is a counseling psychologist with over two decades of clinical and educational experience. Her research looks at cognitive behavioral patterns, youth mental health, and institutional stress management models.',
        teaching: ['Clinical Psychology', 'Research Methods in Social Sciences', 'Cognitive Psychology'],
        research: [
            { title: 'Evaluating institutional support mechanisms on student anxiety: A longitudinal study', journal: 'Journal of Applied Psychology, 2024' }
        ],
        achievements: [
            'Established the Student Counseling and Wellness Center on campus',
            'Distinguished Leadership in Humanities Education Award 2023'
        ]
    }
};
