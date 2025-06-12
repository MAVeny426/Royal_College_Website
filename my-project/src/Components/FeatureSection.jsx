import React from 'react';
import FeatureCard from './FeatureCard';
import card1 from '../college_website/card1.jpg';
import card2 from '../college_website/card2.jpg';
import card3 from '../college_website/card3.jpg';

const features = [
  {
    image: card1,
    title: 'Teacher Details',
    description: 'Learn from the best with real industry insights.',
    link: '/teachersdetails', 
  },
  {
    image: card2,
    title: 'Course Details',
    description: 'Hands-on learning that keeps you engaged and informed.',
    link: '/coursedetails', 
  },
  {
    image: card3,
    title: 'Student Details',
    description: 'Join thousands of learners worldwide on our platform.',
    link: '/studentsdetails', 
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              link={feature.link} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
