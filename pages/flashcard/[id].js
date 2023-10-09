import Head from "next/head";
import Layout from "@/components/Layout";
import { getSession, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { customUrl } from "@/lib/url";

export default function Flashcard({ serverContent }) {
  const [flashcards, setFlashcards] = useState([]);
  const [guideId, setGuideId] = useState("");

  const toggleCard = (key) => {
    const newFlashcards = flashcards
    const currentState = newFlashcards[key].showQuestion;
    newFlashcards[key].showQuestion = !currentState;
    setFlashcards([...newFlashcards])
  }

  useEffect(() => {
    if(serverContent) {
      setGuideId(serverContent.studyGuide)
      setFlashcards(serverContent.card);
    }
  }, [serverContent]);
  
  return (
    <div>
      <Head>
        <title>Flashcard | Sahib AI</title>
      </Head>
      <div>
        <Layout activeTab="Flashcard">
          <main className="">
            <h1 className="text-3xl font-semibold text-center">
              Flashcard
            </h1>

            <section>
              <div className="flex flex-wrap mx-auto max-w-7xl justify-center">
                {flashcards.map((flashcard, key) => 
                  <div className="sm:w-[300px] w-[230px] text-sm sm:text-base mx-2 py-5 px-4 lg:px-6 rounded-lg border bg-card text-card-foreground shadow-sm mt-5 text-center bg-slate-800 text-white flex items-center justify-center" key={key}>
                    <div>
                      {flashcard.showQuestion
                        ? <div> { flashcard.question }  </div>
                        : <div> { flashcard.answer }  </div>
                      }
                      <Button className="mt-2" size="sm" onClick={() => toggleCard(key)}>
                        {flashcard.showQuestion ? "Show Answer" : "Show Question"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <Link 
                  className={cn(buttonVariants({ size: "lg" }), "mt-8")}
                  href={`/chat/${guideId}`}
                > 
                  Chat with Document
                </Link>
              </div>
            </section>

          </main>
        </Layout>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const { id: contentId } = params;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect_page=/flashcard/${contentId}`,
        permanent: false,
      },
    };
  }

  let serverContent;

  await fetch(customUrl(`/api/flashcard/get/${contentId}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: session.user.email,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      serverContent = data.data;
    })
    .catch((error) => {
      serverContent = null;
    });

  return {
    props: {
      session,
      serverContent
    },
  };
}
