// app/data/experience.ts
export interface ExperienceItem {
  title: string;
  period: string;
  description: string;
  link: string;
  skills: string[];
}

export const experiences: ExperienceItem[] = [
    {
        title: "Junior Programmer",
        period: "April / 2025 - Present",
        description:
            "Responsible for managing and improving the company's Inventory Management System (IMS), regularly performing updates and enhancements to ensure efficiency. Also involved in developing small-scale internal projects to support the head office operations, while maintaining web accessibility standards across UI components.",
        skills: ["PHP", "Javascript", "HTML", "CSS", "Excel", "VBA", "MySQL"],
        link: "https://fisherfarms.ph/",
    },
    {
        title: "MIS-IT Analyst and Programmer",
        period: "May / 2024 - March / 2025",
        description:
            "Responsible for contributing to the creation and maintenance of UI components with a focus on web accessibility. In addition to this, manage the company's e-commerce website using Shopify, ensuring the timely updates of banners, product images, and applying promotional discounts when necessary.",
        skills: ["PHP", "Javascript", "HTML", "CSS", "Shopify", "MySQL"],
        link: "https://flawless.com.ph/",
    },
    {
        title: "Internship Junior Software Developer",
        period: "Jan / 2024 - May / 2024",
        description:
            "Gained hands-on experience with a wide range of technologies, fueling a passion for continuous learning. Focused on QA testing, bug fixing, and contributing to website improvements to enhance performance and functionality.",
        skills: [
            "Next.js",
            "Docker",
            "Typescript",
            "Tailwind CSS",
            "MongoDB",
            "GraphQL",
            "React Native",
            "Expo Go",
            "Kafka",
            "Temporal",
        ],
        link: "https://www.itemcount.io/",
    },
];