const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  /*{ name: "Projects",
    link: "#projects",
  },*/
  {
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    name: "Certifications",
    link: "#certifications",
  }
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 5, suffix: "+", label: "Satisfied Employers & Clients" },
  { value: 5, suffix: "+", label: "Automated Pipelines" },
  { value: 2, suffix: "+", label: "Cloud Platforms" },
  { value: 10, suffix: "+", label: "Infrastructure Projects" },
  { value: 25, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/Ansible.png",
  },
  {
    imgPath: "/images/logos/Apache-Maven.png",
  },
  {
    imgPath: "/images/logos/AWS.png",
  },
  {
    imgPath: "/images/logos/Blender.png",
  },
  {
    imgPath: "/images/logos/Cloudflare.png",
  },
  {
    imgPath: "/images/logos/RabbitMQ.png",
  },
  {
    imgPath: "/images/logos/Docker.png",
  },
  {
    imgPath: "/images/logos/Git.png",
  },
  {
    imgPath: "/images/logos/GitHub-Actions.png",
  },
  {
    imgPath: "/images/logos/GitLab.png",
  },
  {
    imgPath: "/images/logos/Google-Cloud.png",
  },
  {
    imgPath: "/images/logos/Grafana.png",
  },
  {
    imgPath: "/images/logos/HashiCorp-Terraform.png",
  },
  {
    imgPath: "/images/logos/Helm.png",
  },
  {
    imgPath: "/images/logos/Jenkins.png",
  },
  {
    imgPath: "/images/logos/Linux.png",
  },
  {
    imgPath: "/images/logos/MATLAB.png",
  },
  {
    imgPath: "/images/logos/MongoDB.png",
  },
  {
    imgPath: "/images/logos/Prometheus.png",
  },
  {
    imgPath: "/images/logos/RabbitMQ.png",
  },
  {
    imgPath: "/images/logos/Redis.png",
  },
  {
    imgPath: "/images/logos/Vite.js.png",
  },
  {
    imgPath: "/images/logos/WordPress.png",
  },
];

const abilities = [
  {
    imgPath: "/images/cicd.png",
    title: "CI/CD Pipelines",
    desc: "Designed and maintained Jenkins/GitHub Actions pipelines with SonarQube integration for code quality checks.",
  },
  {
    imgPath: "/images/terraform.png",
    title: "Infrastructure as Code",
    desc: "Automated infrastructure provisioning using Terraform across GCP/AWS environments.",
  },
  {
    imgPath: "/images/kubernetes.png",
    title: "Kubernetes Orchestration",
    desc: "Deployed scalable applications on Kubernetes clusters with auto-scaling and load balancing.",
  },
  {
    imgPath: "/images/security.png",
    title: "Security & Compliance",
    desc: "Implemented IAM policies, Wazuh IDS, and vulnerability scanning with OpenVAS.",
  },
  {
    imgPath: "/images/Grafana.png", // Add icon
    title: "Monitoring & Logging",
    desc: "Implemented centralized logging and monitoring solutions using Google Cloud Operations Suite (formerly Stackdriver) for real-time application insights. Configured Prometheus and Grafana dashboards for proactive issue detection and performance optimization."
  },
  {
    imgPath: "/images/Ansible.png", // Add icon
    title: "Configuration Management",
    desc: "Automated server configurations and deployments using Ansible playbooks. Managed infrastructure consistency across environments with shell scripting and automated day-to-day operations."
  }
];

const certifications = [
  {
    review: "This certification validates my expertise in designing and implementing scalable cloud solutions on Google Cloud Platform.",
    name: "Google Cloud Platform - Professional Cloud Architect",
    issuer: "Google Cloud Platform (GCP)",
    id: "0x58833fc641967b0ecdf63b5237e813573814f3d29981a2869e7fb7d59a2b14f6",
    date: "March 2024",
    url: "https://google.accredible.com/70e818c9-7f35-48b7-96f1-2764492d7f5e#acc.UqJsm13e ",
    imgPath: "/images/GCP-Badge.png",
  },
  {
    review: "The AWS Certified Developer – Associate certification validates my proficiency in designing, developing, deploying, and operating cloud-based applications using AWS services. ",
    name: "AWS Certified Developer Associate",
    issuer: "Udemy",
    id: "UC-eef7ac7f-494f-4725-a5e0-d55bd4b0fe09",
    date: "February 2024",
    url: "https://www.udemy.com/certificate/UC-eef7ac7f-494f-4725-a5e0-d55bd4b0fe09/ ",
    imgPath: "/images/AWS-CDA.png",
  },
  {
    review: "The Google Cloud – Associate Cloud Engineer certification validates my foundational knowledge and practical skills in designing, deploying, and managing applications on Google Cloud Platform.",
    name: "Google Cloud- Associate Cloud Engineer",
    issuer: "Udemy",
    id: "UC-a86ae51b-4e2a-44ff-bb5f-e7d59c5740a1|",
    date: "February 2024",
    url: "https://www.udemy.com/certificate/UC-a86ae51b-4e2a-44ff-bb5f-e7d59c5740a1/ ",
    imgPath: "/images/GCP-ACE.png",
  },
];

export { certifications };

const techStackImgs = [
  {
    name: "GCP",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Docker",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Kubernetes",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Terraform",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "GitHub Actions",
    imgPath: "/images/logos/git.svg",
  },
  {
    name: "Keycloak",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Grafana",
    imgPath: "/images/logos/Grafana.svg",
  },
  {
    name: "Ansible",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "AWS",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Jenkins",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "GCP",
    modelPath: "/models/Google+Cloud-transformed.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Docker",
    modelPath: "/models/docker.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Kubernetes",
    modelPath: "/models/Kubernetes-transformed.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Terraform",
    modelPath: "/models/Terraform-transformed.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "GitHub Actions",
    modelPath: "/models/GitHub+Actions-transformed.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Keycloak",
    modelPath: "/models/Keycloak-transformed.glb",
    scale: 0.055,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Grafana",
    modelPath: "/models/grafana.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Ansible",
    modelPath: "/models/Ansible-transformed.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "AWS",
    modelPath: "/models/AWS-transformed.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
  {
    name: "Jenkins",
    modelPath: "/models/jenkins.glb",
    scale: 0.05,
    rotation: [1.5, 0, 0],
  },
];

const expCards = [
    {
    review: "Leading DevOps transformation for Millennium S.p.A.'s healthcare software suite, architecting Azure Kubernetes infrastructure for Millewin and Milleweb electronic medical record systems serving 18,000+ medical practitioners across Italy with GDPR-compliant patient data management.",
    imgPath: "/images/Millennium.png",
    logoPath: "/images/millenniumlogo.jpg",
    title: "Senior DevOps Engineer",
    date: "December 2025 - Present",
    responsibilities: [
      "Architecting and managing self-hosted Kubernetes clusters and Azure Container Apps with Terraform for high-availability healthcare SaaS applications serving thousands of general practitioners and pediatricians",
      "Implementing robust CI/CD pipelines using GitLab CI/CD for Spring Boot microservices, Maven-based Java applications, and PostgreSQL databases managing sensitive patient medical records",
      "Deploying and managing Apache Kafka messaging infrastructure for real-time processing of medical prescriptions, diagnostic reports, and healthcare data exchanges",
      "Securing applications with Keycloak identity and access management, implementing OAuth2/OpenID Connect authentication for healthcare professionals accessing patient data",
      "Managing container orchestration with Docker and self-hosted Kubernetes clusters alongside Azure Container Apps, ensuring HIPAA/GDPR-compliant deployments across multiple Azure regions with 99.9% uptime for critical medical services",
      "Automating infrastructure provisioning with Ansible for Linux-based production environments and supporting Firebase services for patient mobile applications"
    ],
  },
  {
    review: "Nithin transformed our GCP environment at aiGoT—his Terraform modules and automated pipelines on GKE and Cloud Run cut deployment toil by 90% and kept us rock-solid at 99.9% uptime.",
    imgPath: "/images/Aigot-logo.png",
    logoPath: "/images/Aigot-logo.png",
    title: "DevOps | SRE | Cloud Engineer",
    date: "October 2024 - December 2025",
    responsibilities: [
      "Defined and managed GCP infrastructure via Terraform, cutting manual setup time by 90%.",
      "Automated Docker-based CI/CD pipelines with GitHub, reducing deploys from hours to minutes.",
      "Architected GKE clusters with Prometheus/Grafana monitoring and PagerDuty alerts, sustaining 99.9% uptime.",
      "Optimized resource usage (Savings Plans, rightsizing) to slash cloud costs by 35%.",
    ],
  },
  {
    review: "Under Nithin’s guidance, we containerized legacy services in GKE and implemented GitOps workflows—our release cadence doubled and rollbacks became nearly unheard of.",
    imgPath: "/images/Zemoso-small.png",
    logoPath: "/images/Zemoso.png",
    title: "DevOps Engineer",
    date: "April 2024 - October 2024",
    responsibilities: [
      "Containerized legacy apps with Docker and migrated them into GKE using Helm charts for zero-downtime rollouts.",
      "Built GitOps pipelines (Argo CD + Jenkins) with security scans and rollback hooks, boosting deployment confidence.",
      "Centralized logs in ELK and set up synthetic checks in Grafana, cutting MTTR by 50%.",
      "Trained 3+ engineers on Kubernetes best practices.",
    ],
  },
  {
    review: "Nithin’s comprehensive quality and performance testing of washing machines, tumble dryers, dishwashers, and washer-dryers using Python/Robot-framework ensured our products shipped with rock-solid reliability and drove a 30% reduction in field failures.",
    imgPath: "/images/elux.png",
    logoPath: "/images/Electrolux-logo.png",
    title: "SysVal and connectivity engineer",
    date: "May 2023 - January 2024",
    responsibilities: [
      "Developed and executed end-to-end quality and performance tests for washing machines, tumble dryers, dishwashers, and washer-dryers using Python/Robot-framework.",
      "Automated daily Jenkins regression runs to catch 80% of regressions before feature freeze.",
      "Validated Wi-Fi, BLE, MQTT and CoAP connectivity against AWS/Azure IoT hubs and CE/FCC standards.",
      "Debugged hardware and protocol issues with oscilloscopes and Wireshark, reducing field failures by 30%.",
    ],
  },
  {
    review: "Nithin’s real-time implementation of a fault-tolerant symmetrical six-phase motor-drive on STM32 proved his simulations in practice—delivering cost-effective inverter designs that maintain torque under fault conditions with minimal ripple.",
    imgPath: "/images/stm-logo-small.png",
    logoPath: "/images/stm-logo.png",
    title: "Firmware Engineer",
    date: "July 2022 - January 2023",
    responsibilities: [
      "Modeled a symmetrical six-phase induction machine to evaluate motor-drive reliability and fault scenarios.",
      "Explored and compared multiple fault-tolerance schemes, highlighting post-fault current reconfiguration to cut inverter costs.",
      "Implemented the selected reconfiguration algorithm on an STM32 microcontroller using IAR Embedded Workbench.",
      "Validated real-time performance—preserving magnetomotive force and torque under fault with only minor ripple.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/aigot.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Nicola Marmugi",
    mentions: "nicolamarmugi",
    review:
      "Nithin delivered a robust DevOps solution that reduced our deployment time by 70%. His expertise in GitHub Actions and infrastructure automation was crucial for our digital transformation.",
    imgPath: "/images/Nico.png",
  },
  {
    name: "Salvatore Galati",
    mentions: "salvatoregalati",
    review:
      "Nithin’s infrastructure automation solutions saved us countless hours. His Kubernetes and Terraform implementation was both elegant and efficient.",
    imgPath: "/images/Salvo.png",
  },
  {
    name: "Piermatteo Grieco",
    mentions: "ceo_aigot",
    review:
      "Nithin’s expertise in DevOps transformed our cloud infrastructure. His implementation of Terraform and Kubernetes pipelines reduced deployment times by 60%. He’s a true asset to any team.",
    imgPath: "/images/pier.png",
  },
  {
    name: "Priyanjali Guha",
    mentions: "hr_aigot",
    review:
      "Working with Nithin was seamless. His ability to communicate complex DevOps concepts to non-technical stakeholders made him invaluable during our infrastructure overhaul.",
    imgPath: "/images/PJ.png",
  },
  {
    name: "Francesco Postorino",
    mentions: "francescopostorini",
    review:
      "Working with Nithin was a pleasure. He deployed a secure Netbird-based VPN on GCP and conducted performance testing with Gatling. His attention to detail is unmatched.",
    imgPath: "/images/posto.png",
  },
  {
    name: "Katia Pasini",
    mentions: "katiapasini",
    review:
      "Nithin’s work on our Docker containerization strategy was exceptional. He optimized deployments with Kubernetes orchestration and managed MongoDB Atlas seamlessly.",
    imgPath: "/images/brando.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    url: "https://www.instagram.com/nitin_yerola?igsh=MTJ3ZGd6OXQydzNzeg%3D%3D&utm_source=qr",
    imgPath: "/images/insta.png",
  },
  /*{
    name: "fb",
    imgPath: "/images/fb.png",
  },*/
  /*{
    name: "x",
    imgPath: "/images/x.png",
  },*/
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/thadem-n-790bb520a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
