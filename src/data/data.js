import profileImg from "../assets/images/profileImg.webp";
import pwLogo from "../assets/images/pwLogo.webp";
import sagarLogo from "../assets/images/sagarLogo.webp";
import pumperAppLogo from "../assets/images/pumperAppLogo.webp";
import pwAppLogo from "../assets/images/pwAppLogo.webp";
import mritsLogo from "../assets/images/mritsLogo.webp";
// import dsLogo from "../assets/images/dsLogo.webp";
// import tsbdLogo from "../assets/images/tsbdLogo.webp";
import svecLogo from "../assets/images/svecLogo.webp";
import sasiLogo from "../assets/images/sasiLogo.webp";
import mahatiLogo from "../assets/images/mahatiLogo.webp";
import githubLogo from "../assets/images/githubLogo.webp";
import linkedinLogo from "../assets/images/linkedinLogo.webp";
import gmailLogo from "../assets/images/gmailLogo.webp";
const data = {
  menu: [
    {
      name: "About",
      link: "#about",
      icon: "",
    },
    {
      name: "Experience",
      link: "#experience",
      icon: "",
    },
    {
      name: "Projects",
      link: "#projects",
      icon: "",
    },
    {
      name: "Skills",
      link: "#skills",
      icon: "",
    },
    {
      name: "Achievements",
      link: "#achievements",
      icon: "",
    },
    {
      name: "Education",
      link: "#education",
      icon: "",
    },
  ],
  Profile: {
    introText: "Hi, I'm Rupesh",
    image: profileImg,
    name: "Rupesh",
    designation: "Senior Developer",
    description:
      "Results-driven Full Stack Developer with 4+ years of experience in building scalable web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Proficient in Agile methodologies with expertise in front-end and back-end development, delivering high-quality solutions that align with business objectives.",
  },
  workExperience: [
    {
      company: "Proveway Pvt. Ltd.",
      designation: "Senior Developer",
      duration: "Aug 2021-Present",
      image:pwLogo,
      summary: [
        "Developed full stack applications using Shopify Polaris and the MERN stack, ensuring seamless user experiences and robust backend functionality.",
        "Achieved Built for Shopify status by following best coding practices, enhancing merchant trust, and increasing app installations by 30%.",
        "Optimized app performance, reducing LCP scores from 6s to 1.2s.",
        "Developed backend logic and optimized APIs, improving system efficiency and reducing load times by 40%.",
        "Created scalable AWS Lambda scripts to manage approximately 3 million orders globally.",
        "Seamlessly integrated PayPal and Stripe APIs for automated tracking synchronization, leading to recognition as a PayPal Official Partner.",
        "Developed a payment module for app-related subscriptions, generating approximately $34k in monthly recurring revenue (MRR).",
        "Collaborated with designers and product managers to deliver high-priority features from Canny and FeaturesVote, increasing user satisfaction by 25%.",
        "Implemented component-based architecture, reducing deployment time for new features by 50%.",
        "Established app usage analytics using Metabase, Mixpanel, and Posthog, reducing churn from 30% to 7%.",
        "Created AWS Lambda scripts for transaction email automation using AWS SES, Mailchimp, and Userlists.",
        "Reduced ticket resolution time from 8 hours to 1.5 hours by integrating ClickUp and Crisp.",
        "Developed insights dashboards on AWS CloudWatch to monitor AWS Lambda scripts.",
        "Integrated Sentry with Slack for error reporting, increasing app stability by 50%.",
        "Utilized MongoDB, MySQL, and Redis, improving data retrieval speed by 40%.",
        "Reduced MongoDB costs by 60% through query optimization, indexing, aggregation pipelines, and efficient schema design, while cutting cloud service expenses by eliminating redundant data storage.",
      ],
    },
    {
      company: "Sagar Software Solutions Pvt. Ltd.",
      designation: "Team Lead & PHP Developer",
      duration: "Aug 2019-Aug 2021",
      image:sagarLogo,
      summary: [
        "Providing technical leadership by guiding a team of 5 members, assigning tasks, and ensuring 100% adherence to deadlines.",
        "Conducted code reviews that improved code quality, reducing post-release issues by 30%.",
        "Designed, developed, tested, and maintained applications, achieving a 25% reduction in development time through streamlined processes.",
        "Deployed 10+ PHP applications to production servers using industry-standard configuration practices, ensuring 99.9% uptime.",
        "Integrated payment gateways such as Paytm and Razorpay, resulting in a 30% increase in transaction efficiency.",
      ],
    }
  ],
  projects: [
    {
      title: "Pumper Bundles Volume Discount",
      company: "Proveway Pvt. Ltd.",
      image:pumperAppLogo,
      link: "https://apps.shopify.com/pumper-quantity-breaks-product-bundles-discounts",
      summary: [
        "Independently developed the entire pricing module for the Pumper app, implementing features such as transaction emails, coupon code functionality, feature requests, and changelog. This resulted in a 30% increase in user engagement.",
        "Created a comprehensive pricing module that generated approximately $20k in monthly recurring revenue (MRR) and contributed to a 25% increase in customer retention.",
        "Enhanced app functionality by integrating customer-requested features, contributing to a 15% boost in customer retention and satisfaction.",
      ],
    },
    {
      title: "Proveway PayPal Sync",
      company: "Proveway Pvt. Ltd.",
      image: pwAppLogo,
      link: "https://apps.shopify.com/add-paypal-tracking-by-uptrack",
      summary: [
        "Independently rewrote the entire Proveway PayPal Sync app from scratch, eliminating 20% of redundant code and optimizing performance by 60%. This led to a 40% increase in user engagement and a 75% reduction in support tickets.",
        "Developed scalable AWS Lambda scripts to automate tracking processes, improving efficiency by 20% and reducing operational costs by 15%.",
        "Created a comprehensive pricing module that generated approximately $14k in monthly recurring revenue (MRR) and contributed to a 25% increase in customer retention.",
        "Reduced LCP scores from 6s to 1.2s, achieving Built for Shopify status and securing recognition as a PayPal Official Partner.",
      ],
    },
    {
      title: "Malla Reddy Institute of Technology & Science (MRITS)",
      company: "Sagar Software Solutions Pvt. Ltd.",
      image: mritsLogo,
      link: "https://www.mrits.ac.in/",
      summary: [
        "Revamped the outdated UI with a modern, user-friendly design, improving user engagement by 25%. Implemented robust backend functionalities to seamlessly manage the front-end.",
        "Optimized website performance, reducing page load time by 30% and improving mobile responsiveness.",
      ],
    },
    // {
    //   title: "Digital Students",
    //   company: "Sagar Software Solutions Pvt. Ltd.",
    //   image: dsLogo,
    //   link: "https://digitalstudents.in/",
    //   summary: [
    //     "Revamped the outdated UI with a modern, user-friendly design, improving user engagement by 25%. Implemented robust backend functionalities to seamlessly manage the front-end.",
    //     "Optimized website performance, reducing page load time by 30% and improving mobile responsiveness.",
    //   ],
    // },
    // {
    //   title: "Telangana Biodiversity Board",
    //   company: "Sagar Software Solutions Pvt. Ltd.",
    //   image: tsbdLogo,
    //   link: "",
    //   summary: [
    //     "Revamped the outdated UI with a modern, user-friendly design, improving user engagement by 25%. Implemented robust backend functionalities to seamlessly manage the front-end.",
    //     "Optimized website performance, reducing page load time by 30% and improving mobile responsiveness.",
    //   ],
    // }
  ],
  frontendSkills: [
    {
      name: "HTML",
      icon: "",
    },
    {
      name: "CSS",
      icon: "",
    },
    {
      name: "JavaScript",
      icon: "",
    },
    {
      name: "jQuery",
      icon: "",
    },
    {
      name: "Ajax",
      icon: "",
    },
    {
      name: "React",
      icon: "",
    },
    {
      name: "Vite",
      icon: "",
    },
  ],
  uiLibraries: [
    {
      name: "Bootstrap",
      icon: "",
    },
    {
      name: "Tailwind CSS",
      icon: "",
    },
    {
      name: "Shopify Polaris",
      icon: "",
    },
    {
      name: "Ant Design",
      icon: "",
    },
  ],
  backendSkills: [
    {
      name: "Node.js",
      icon: "",
    },
    {
      name: "Express.js",
      icon: "",
    },
    {
      name: "Core PHP",
      icon: "",
    },
    {
      name: "CodeIgniter",
      icon: "",
    },
  ],
  apiSkillsAndTools: [
    {
      name: "REST API",
      icon: "",
    },
    {
      name: "GraphQL",
      icon: "",
    },
    {
      name: "Postman",
      icon: "",
    },
    {
      name: "Swagger",
      icon: "",
    },
  ],
  databaseSkills: [
    {
      name: "MySQL",
      icon: "",
    },
    {
      name: "MongoDB",
      icon: "",
    },
    {
      name: "Redis",
      icon: "",
    },
  ],
  cloudSkills: [
    {
      name: "AWS",
      subSkills: [
        "Lambda",
        "S3",
        "SQS",
        "SES",
        "EventBridge",
        "CloudWatch",
        "API Gateway",
      ],
      icon: "",
    },
  ],
  monitoringTools: [
    {
      name: "Sentry",
      icon: "",
    },
  ],
  hostingDomainTools: [
    {
      name: "Heroku",
      icon: "",
    },
    {
      name: "Godaddy",
      icon: "",
    },
    {
      name: "Hostinger",
      icon: "",
    },
  ],
  ciCdSkills: [
    {
      name: "Github",
      icon: "",
    },
    {
      name: "BitBucket",
      icon: "",
    },
  ],
  analyticsEngagementTools: [
    {
      name: "Posthog",
      icon: "",
    },
    {
      name: "Metabase",
      icon: "",
    },
    {
      name: "Mixpanel",
      icon: "",
    },
    {
      name: "Google Analytics",
      icon: "",
    },
    {
      name: "Customer.io",
      icon: "",
    },
    {
      name: "Userflow",
      icon: "",
    },
    {
      name: "Mailchimp",
      icon: "",
    },
  ],
  developmentEditorTools: [
    {
      name: "XAMPP",
      icon: "",
    },
    {
      name: "Laragon",
      icon: "",
    },
    {
      name: "MongoDB Compass",
      icon: "",
    },
    {
      name: "Studio 3T",
      icon: "",
    },
    {
      name: "Shopify CLI",
      icon: "",
    },
    {
      name: "Heroku CLI",
      icon: "",
    },
    {
      name: "VS Code",
      icon: "",
    },
    {
      name: "Cursor",
      icon: "",
    },
  ],
  featureManagementRequestsTools: [
    {
      name: "Flagsmith",
      icon: "",
    },
    {
      name: "GrowthBook",
      icon: "",
    },
    {
      name: "Feature Vote",
      icon: "",
    },
    {
      name: "Canny",
      icon: "",
    },
  ],
  collaborationProductivityTools: [
    {
      name: "Clickup",
      icon: "",
    },
    {
      name: "Slack",
      icon: "",
    },
    {
      name: "Crisp",
      icon: "",
    },
  ],
  ai: [
    {
      name: "ChatGPT",
      icon: "",
    },
    {
      name: "Cursor",
      icon: "",
    },
    {
      name: "Github Copilot",
      icon: "",
    },
    {
      name: "Bolt",
      icon: "",
    },
  ],
  achievements: [
    "Awarded as Best Employee of the Year at Sagar Software Solutions Pvt. Ltd.",
    "Awarded as Best Techie of the Year at Sagar Software Solutions Pvt. Ltd.",
  ],
  education: [
    {
      college: "Sri Vasavi Engineering College",
      degree: "B.Tech in Electronics and Communication Engineering",
      duration: "2013 - 2017",
      image: svecLogo,
    },
    {
      college: "Sasi Junior College",
      degree: "Intermediate (M.P.C)",
      duration: "2011 - 2013",
      image: sasiLogo,
    },
    {
      college: "Mahati EM School",
      degree: "SSC (Class X)",
      duration: "2010 - 2011",
      image: mahatiLogo,
    },
  ],
  contact: [
    {
      name: "GitHub",
      value: "rupeshreddysatti",
      link: "/",
      icon: githubLogo,
    },
    {
      name: "LinkedIn",
      value: "rupeshreddysatti",
      link: "https://in.linkedin.com/in/rupeshreddysatti",
      icon: linkedinLogo,
    },
    {
      name: "Email",
      value: "sattirupeshreddy@gmail.com",
      link: "mailto:sattirupeshreddy@gmail.com",
      icon: gmailLogo,
    },
  ],
};
export default data;
