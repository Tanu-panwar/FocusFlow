

const TestimonialSection = () => {
    // Exact testimonials from the screenshot
    const leftColumnTestimonials = [
        {
            id: 1,
            name: "David Foster",
            company: "Engineering Student",
            text: "FocusFlow helped me stay consistent during my final semester. The Pomodoro and habit tracker changed everything!",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Jonathan Reed",
            company: "Medical Aspirant",
            text: "Flashcards are a lifesaver. I can revise on the go, and my retention has improved drastically.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Emma James",
            company: "Design Student",
            text: "FocusFlow made balancing creative projects and academics stress-free. Notes and timers in one place = perfect!",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const middleColumnTestimonials = [
        {
            id: 4,
            name: "Samantha Lee",
            company: "CAT Aspirant",
            text: "I love the structured productivity FocusFlow brings. My daily habits and Pomodoro tasks keep me on track.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 5,
            name: "Michael Davis",
            company: "Remote Learner",
            text: "Being a remote student was hard, but FocusFlow gave me routine. I even use the text summarizer for research!",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 6,
            name: "Alex Johnson",
            company: "Software Intern",
            text: "Tracking my progress daily with FocusFlow has made my self-study routine 10x more effective.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const rightColumnTestimonials = [
        {
            id: 7,
            name: "Olivia Turner",
            company: "Final Year Student",
            text: "The Pomodoro technique built into FocusFlow is SO GOOD! I never thought I'd enjoy focused study this much.",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 8,
            name: "Liam Cooper",
            company: "Competitive Exam Prep",
            text: "Using FocusFlow daily improved my discipline. From flashcards to notes, everything's connected and efficient.",
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 9,
            name: "Rachel Kim",
            company: "Productivity Enthusiast",
            text: "FocusFlow isn’t just a tool — it’s a lifestyle. I can’t imagine organizing my day without it now!",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
        }
    ];

    // Testimonial Card Component matching the screenshot layout
    const TestimonialCard = ({ testimonial }) => (
        <div className="bg-zinc-800 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-700/30">
            <div className="flex items-start space-x-3 mb-3">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                    <h4 className="text-white font-medium text-xl">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xl">{testimonial.company}</p>
                </div>
            </div>
            <p className="text-gray-300 text-[16px] leading-relaxed">
                {testimonial.text}
            </p>
        </div>
    );

    // Create infinite scrolling arrays
    const createInfiniteArray = (arr) => [...arr, ...arr, ...arr, ...arr];

    return (
        <div className="min-h-screen bg-zinc-800 py-16 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#f23064] text-center mb-6 animate-fade-in">
                        People Can't Stop{' '}
                        <span
                            className="italic font-serif"
                        >
                            Talking
                        </span>
                    </h1>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">About Us</h3>
                </div>

                {/* Three Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column - Moving Up */}
                    <div className="relative h-[500px] overflow-hidden">
                        <div
                            className="absolute w-full"
                            style={{
                                animation: 'scrollUp 15s linear infinite'
                            }}
                        >
                            {createInfiniteArray(leftColumnTestimonials).map((testimonial, index) => (
                                <TestimonialCard key={`left-${testimonial.id}-${index}`} testimonial={testimonial} />
                            ))}
                        </div>
                        {/* Gradient fade effects */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-zinc-700 via-zinc-700/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-700 via-zinc-700/80 to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* Middle Column - Moving Down */}
                    <div className="relative h-[500px] overflow-hidden">
                        <div
                            className="absolute w-full"
                            style={{
                                animation: 'scrollDown 18s linear infinite'
                            }}
                        >
                            {createInfiniteArray(middleColumnTestimonials).map((testimonial, index) => (
                                <TestimonialCard key={`middle-${testimonial.id}-${index}`} testimonial={testimonial} />
                            ))}
                        </div>
                        {/* Gradient fade effects */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-zinc-700 via-zinc-700/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-700 via-zinc-700/80 to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* Right Column - Moving Up */}
                    <div className="relative h-[500px] overflow-hidden">
                        <div
                            className="absolute w-full"
                            style={{
                                animation: 'scrollUp 20s linear infinite'
                            }}
                        >
                            {createInfiniteArray(rightColumnTestimonials).map((testimonial, index) => (
                                <TestimonialCard key={`right-${testimonial.id}-${index}`} testimonial={testimonial} />
                            ))}
                        </div>
                        {/* Gradient fade effects */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-zinc-700 via-zinc-700/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-700 via-zinc-700/80 to-transparent z-10 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Smooth scrolling */
        .relative > div {
          will-change: transform;
        }
      `}</style>
        </div>
    );
};

export default TestimonialSection;