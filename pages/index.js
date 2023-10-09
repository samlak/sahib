import Head from "next/head";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Layout from "@/components/HomePage/layout";

const Home = () => {
  const features = [
    {
      title: "AI Client Onboarding",
      description:
        "Onboard your client using the power of artificial intelligence and be able to convert leads even when you sleep.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 fill-current -ml-1"
          viewBox="0 -960 960 960"
        >
          <path d="M482-401q58 0 98-40t40-98q0-58-40-98t-98-40q-58 0-98 40t-40 98q0 58 40 98t98 40ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-37q-60-56-136-90.5T480-342q-88 0-164 34.5T180-217v37Z" />
        </svg>
      ),
    },
    {
      title: "Client Relationship Enhancement",
      description:
        "Get valuable insights, write professional emails and proposals. Strengthen client relationship easily.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 fill-current -ml-1"
          viewBox="0 -960 960 960"
        >
          <path d="M480-629 354-755l126-126 126 126-126 126ZM40-160v-160q0-29 20.5-49.5T110-390h141q17 0 32.5 8.5T310-358q29 42 74 65t96 23q51 0 96-23t75-65q11-15 26-23.5t32-8.5h141q29 0 49.5 20.5T920-320v160H660v-119q-36 33-82.5 51T480-210q-51 0-97-18t-83-51v119H40Zm120-300q-45 0-77.5-32.5T50-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T160-460Zm640 0q-45 0-77.5-32.5T690-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T800-460Z" />
        </svg>
      ),
    },
    {
      title: "Automated Lead Follow-up",
      description:
        "Set up automated follow-up messages to engage with potential clients and nurture leads over time.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 fill-current -ml-1"
          viewBox="0 -960 960 960"
        >
          <path d="M766-40v-200h-60v-240h145l-58 170h87L766-40ZM80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v280H646v300H240L80-80Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Sahib AI | Elevate Your Freelancing Journey! 🚀</title>
      </Head>
      <Layout>
        <section className="  bg-slate-100 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link
              href={"/dashboard"}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            >
              Get Started for Free
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Elevate Freelance Success with Sahib AI Chatbots.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Unlock the freelance future with Sahib AI: AI chatbots for deal
              closure and seamless interaction. Join us to thrive independently!
            </p>
            <div className="space-x-4">
              <Link
                href="/study-assistant"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Create Chatbot
              </Link>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 bg-slate-10 py-8 dark:bg-transparent md:py-12 lg:py-24 "
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Sahib AI equips freelancers with AI-powered capabilities,
              enhancing prospect engagement, workflow optimization, and tailored
              suggestions for heightened productivity and client contentment.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex max-h-[300px] flex-col justify-between rounded-md p-6">
                  {feature.icon}
                  <div className="space-y-2 mt-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Sahib AI goes beyond the norm, offering chatbots to aid
              freelancers in deal closures and client interactions during their
              absence.
            </p>
          </div>
        </section>
        <section id="open-source" className="  bg-slate-100 container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Freelancer Centric
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Empowering freelancers for remarkable growth and career
              acceleration. <br /> Join Sahib AI today and thrive in your
              freelance journey!
            </p>

            <Link href={"/study-assistant"} rel="noreferrer" className="flex">
              <div className="flex items-center">
                <div className="flex h-11 items-center rounded-md border border-muted bg-muted hover:bg-muted/80 px-4 font-medium">
                  Create your own Chatbot
                </div>
              </div>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
