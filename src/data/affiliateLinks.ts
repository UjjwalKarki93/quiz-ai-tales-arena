
export interface AffiliateLink {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  category?: string;
  featured?: boolean;
}

export const affiliateLinks: AffiliateLink[] = [
  {
    title: "Trivia Mastery",
    description: "A comprehensive book on mastering trivia across all subjects",
    link: "https://example.com/trivia-book-affiliate",
    imageUrl: "/placeholder.svg",
    category: "books",
    featured: true
  },
  {
    title: "Trivia Night Kit",
    description: "Everything you need to host an amazing trivia night",
    link: "https://example.com/trivia-kit-affiliate",
    imageUrl: "/placeholder.svg",
    category: "games"
  },
  {
    title: "Brain Training Pro",
    description: "Improve your memory and recall with this subscription service",
    link: "https://example.com/brain-training-affiliate",
    imageUrl: "/placeholder.svg",
    category: "education"
  },
  {
    title: "Quiz Master Online Course",
    description: "Become a trivia expert with this comprehensive online course",
    link: "https://example.com/quiz-master-course-affiliate",
    imageUrl: "/placeholder.svg",
    category: "education"
  },
  {
    title: "History Buff's Guide",
    description: "The ultimate reference guide for history trivia enthusiasts",
    link: "https://example.com/history-guide-affiliate",
    imageUrl: "/placeholder.svg",
    category: "books"
  },
  {
    title: "Science Facts Deck",
    description: "500 fascinating science facts to boost your knowledge",
    link: "https://example.com/science-deck-affiliate",
    imageUrl: "/placeholder.svg",
    category: "games"
  }
];

// Helper function to get affiliate links by category
export const getAffiliatesByCategory = (category: string): AffiliateLink[] => {
  return affiliateLinks.filter(link => link.category === category);
};

// Helper function to get featured affiliate links
export const getFeaturedAffiliates = (): AffiliateLink[] => {
  return affiliateLinks.filter(link => link.featured);
};
