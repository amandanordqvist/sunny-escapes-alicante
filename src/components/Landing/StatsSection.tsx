import { Building } from "lucide-react";

const stats = [
  {
    value: "2,500",
    label: "Properties",
  },
  {
    value: "5,000+",
    label: "Customers",
  },
  {
    value: "170+",
    label: "Awards",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <Building className="h-12 w-12 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  You're in good hands
                </h2>
                <p className="text-primary-foreground/80">
                  Experience the best property deals and service
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
