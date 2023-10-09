import Head from "next/head";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import OverlayWithLoader from "@/components/Loader/OverlayWithLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import Dropzone from "@/components/Form/drop-zone";

export default function StudyAssistant() {
  const router = useRouter();
  const { data: session } = useSession();
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [topic, setTopic] = useState("");

  const onInputChange = (event) => {
    setTopic(event.target.value);
  };

  const onGenerate = async (event) => {
    event.preventDefault();
    setGenerating(true);
    setErrorMessage("");

    await fetch("/api/study-guide/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        email: session.user.email,
      }),
    })
      .then((res) => res.json())
      .then(async (response) => {
        setGenerating(false);
        if (response.status) {
          router.push(`/study-guide/${response.data}`);
        } else {
          setErrorMessage(response.error);
        }
      })
      .catch((error) => {
        setGenerating(false);
        setErrorMessage("Error occurred! Please try again.");
      });
  };

  return (
    <div>
      <Head>
        <title>Study Assistant | Sahib AI</title>
      </Head>
      <div>
        <Layout activeTab="Study Assistant">
          <main className="">
            <h1 className="text-3xl font-semibold text-center">
              Study Assistant
            </h1>

            <div className="relative max-w-xl mx-auto py-8 sm:px-4 lg:px-6 rounded-lg border bg-card text-card-foreground shadow-sm mt-5">
              <form
                className="flex flex-col w-[90%] max-w-lg mx-auto"
                onSubmit={onGenerate}
              >
                <div className="flex flex-col mb-3">
                  <label className="font-semibold mb-2 text-center text-lg">
                    Insert topic to learn
                  </label>
                  <Textarea
                    value={topic}
                    onChange={onInputChange}
                    placeholder="Insert topic to learn"
                    required="required"
                    name="topic"
                    className="border-2"
                  />
                </div>

                <div className="flex justify-center w-full">
                  <Button type="submit" className="mt-1 block px-7"> Generate </Button>
                </div>

                {errorMessage && (
                  <p className="font-semibold text-center text-destructive mt-2">
                    {errorMessage}
                  </p>
                )}

                <p className="text-center my-6 text-slate-800/75 font-semibold text-xl"> 
                  ------ OR ------ 
                </p>

                <Dropzone
                  setGenerating={setGenerating}
                />
              </form>

              {generating && 
                <OverlayWithLoader>
                  <p className="font-medium mt-2">
                    Please wait while your request is been processed. </p>
                </OverlayWithLoader>
              }
            </div>
          </main>
        </Layout>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login?redirect_page=/study-assistant",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
