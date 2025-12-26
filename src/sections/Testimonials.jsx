import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
    return (
        <section id="testimonials" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub="⭐️ Customer feedback highlights"
                />

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-16">
                    {testimonials.map((testimonial, index) => (
                        <GlowCard card={testimonial} key={index}>
                            <div className="flex items-center gap-3">
                                <div>
                                    <img
                                        src={testimonial.imgPath}
                                        alt=""
                                        loading="lazy"
                                        className="w-15 h-15 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-white-50">@{testimonial.mentions}</p>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;