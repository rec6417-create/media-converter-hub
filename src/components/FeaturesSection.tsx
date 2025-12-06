import { Shield, Zap, Clock, Globe, Lock, Infinity } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "სწრაფი კონვერტაცია",
    description: "თანამედროვე ტექნოლოგიები უზრუნველყოფს მაქსიმალურ სიჩქარეს",
  },
  {
    icon: Shield,
    title: "უსაფრთხო",
    description: "ყველა ფაილი ავტომატურად იშლება 1 საათის შემდეგ",
  },
  {
    icon: Clock,
    title: "24/7 ხელმისაწვდომი",
    description: "სერვისი ხელმისაწვდომია ნებისმიერ დროს",
  },
  {
    icon: Globe,
    title: "50+ ფორმატი",
    description: "მხარდაჭერილია ვიდეო, აუდიო და სურათის ფორმატები",
  },
  {
    icon: Lock,
    title: "პირადი",
    description: "შენი ფაილები არ ინახება და არ გადაეცემა მესამე მხარეს",
  },
  {
    icon: Infinity,
    title: "უსასრულო",
    description: "არანაირი შეზღუდვა ფაილების რაოდენობაზე",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            რატომ <span className="gradient-text">MediaFlow</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ჩვენ გთავაზობთ საუკეთესო გამოცდილებას მედია ფაილების კონვერტაციისას
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
