// Single source of truth for all CV / portfolio content.
// Any value set to null renders as a "???" badge on the page so gaps are easy to spot.
// TODO: fill the null fields from your CV.
window.CV_DATA = {
    profile: {
        name: 'Frisco Nirwana Putra',
        handle: 'FRISCO',
        title: 'Software Engineer',
        tagline: 'Building and maintaining backend services with Go.',
        company: 'Amartha Mikro Fintek',
        location: 'Bandung, Indonesia',
        about: [
            "I'm a Software Engineer based in Bandung, working mostly on backend services in Go. " +
                'Day to day I ship new features, keep existing services healthy, and watch them through Grafana dashboards.',
            'I started out building PHP applications at a software house, and I care about clear, maintainable code ' +
                'that other people can pick up easily.',
        ],
    },

    skills: [
        { group: 'Languages', items: ['Golang', 'PHP'] },
        { group: 'Frameworks', items: ['Fiber', 'Laravel', 'CodeIgniter'] },
        { group: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
        { group: 'Messaging', items: ['Kafka'] },
        { group: 'Tooling', items: ['Docker', 'Grafana', 'Vault', 'Bitbucket', 'GitHub Actions', 'Git'] },
    ],

    experience: [
        {
            role: 'Software Engineer',
            org: 'Amartha Mikro Fintek',
            period: 'Aug 2021 — Present',
            details: [
                'Develop new features, including the field officer (FO) onboarding process.',
                'Maintain and improve existing services: customer, location and internal user services.',
                'Develop and maintain Kafka consumer services integrated with other systems.',
                'Monitor service health and performance with Grafana dashboards.',
            ],
            tech: ['Go', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Kafka', 'Docker', 'Grafana', 'Vault', 'Bitbucket'],
        },
        {
            role: 'Backend Developer',
            org: 'Twiscode (software house, Surabaya)',
            period: 'Sep 2020 — Aug 2021',
            details: [
                'Built and maintained an internal employee management dashboard for a client based in Singapore.',
                'Developed backend features in PHP using the Laravel and CodeIgniter frameworks.',
            ],
            tech: ['PHP', 'Laravel', 'CodeIgniter'],
        },
    ],

    projects: [
        {
            name: 'go-fiber-boilerplate',
            description: 'Small Go service boilerplate built on Fiber v3 and Viper, with CI, Docker and release workflows.',
            tags: ['Go', 'Fiber', 'Viper', 'Docker', 'GitHub Actions'],
            url: 'https://github.com/FriscoNP/go-fiber-boilerplate',
        },
        {
            name: 'go-resepee-api',
            description: 'Recipe REST API — final project of the Alterra Golang training.',
            tags: ['Go', 'REST'],
            url: 'https://github.com/FriscoNP/go-resepee-api',
        },
        {
            name: 'bruno-converters',
            description: 'Converters for Bruno API client collections.',
            tags: ['TypeScript', 'Bruno'],
            url: 'https://github.com/FriscoNP/bruno-converters',
        },
        {
            name: 'dotfiles',
            description: 'My personal development environment configuration.',
            tags: ['Shell', 'Config'],
            url: 'https://github.com/FriscoNP/dotfiles',
        },
    ],

    education: [
        { title: 'D3 Informatics Engineering (Teknik Informatika)', org: 'Politeknik Elektronika Negeri Surabaya', period: 'Graduated 2020' },
        { title: 'Golang Training', org: 'Alterra', period: '2021' },
    ],

    links: {
        email: 'frisconp.official@gmail.com',
        github: 'https://github.com/FriscoNP',
        linkedin: 'https://linkedin.com/in/frisconp',
    },
};
