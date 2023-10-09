import Head from "next/head";
import Layout from "@/components/Layout";
import { getSession, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { customUrl } from "@/lib/url";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Loader from "@/components/Loader/Loader";
import { useChat } from 'ai/react';
import { toast } from "@/components/ui/use-toast";

export default function StudyGuide({ serverContent }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { id: contentId } = router.query;
  const [contentData, setContentData] = useState({
    topic: "",
    documentName: null,
    pineconeId: null,
    guide: null
  });
  const [generatingFlashcard, setGeneratingFlashcard] = useState(false);
  const [generatingGuide, setGeneratingGuide] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const onFinishGeneration =  async (data) => {
    await fetch("/api/study-guide/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guide: data.content,
        id: contentId
      }),
    })
    .then((res) => res.json())
    .then(async (response) => {
      setDisableButton(false)
      if (!response.status) {
        toast({
          title: "Unable to save your study guide. Please try again!",
        })
      }
    })
    .catch((error) => {
      setDisableButton(false)
      toast({
        title: "Unable to save your study guide. Please try again!",
      })
    });
  }

  const onError = () => {
    setDisableButton(false);
    setGeneratingGuide(false);
  }

  const { messages,  append, isLoading } = useChat({
    api: "/api/study-guide/generate",
    onFinish: onFinishGeneration,
    onResponse: () => setGeneratingGuide(false),
    onError
  });

  const generateStudyGuide = () => {
    setGeneratingGuide(true)
    setDisableButton(true)
    append({
      role: "topic",
      content: contentData.topic,
    })
  }

  const generateFlashcard = async () => {
    setGeneratingFlashcard(true)
    setDisableButton(true)
    
    await fetch("/api/flashcard/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: contentData.topic,
        guide: contentData.guide,
        guideId: contentId,
        email: session.user.email,
      }),
    })
    .then((res) => res.json())
    .then(async (response) => {
      setDisableButton(false)
      setGeneratingFlashcard(false)

      if (response.status) {
        toast({
          title: "Flashcard generated succesfully.",
          description: "You will now be redirected to the Flashcard page.",
        })


        router.push(`/flashcard/${response.data}`);

      } else {
        toast({
          title: "Flashcard generation failed.",
          description: "Unable to generate flashcard. Please try again!",
        })
      }
    })
    .catch((error) => {
      setDisableButton(false)
      setGeneratingFlashcard(false)
      toast({
        title: "Flashcard generation failed.",
        description: "Unable to generate flashcard. Please try again!",
      })
    });
    
  }
  
  useEffect(() => {
    if(serverContent) {
      setContentData(serverContent);
    }
  }, [serverContent]);

  useEffect(() => {
    if(messages.length > 1) {
      const guideContent =  messages[1].content;
      setContentData({
        ...contentData,
        guide: guideContent
      })
    }
  }, [messages])

  return (
    <div>
      <Head>
        <title>Study Guide | Sahib AI</title>
      </Head>
      <div>
        <Layout activeTab="Study Guide">
          <main className="">
            <h1 className="text-3xl font-semibold text-center">
              Study Guide
            </h1>

            { contentData.guide ?
              <section className="max-w-5xl mx-auto py-5 px-6 md:px-10 rounded-lg border bg-card text-card-foreground shadow-sm mt-5">
                <div className="">
                  <ReactMarkdown
                    className="markdown text-sm md:text-base leading-relaxed"
                    remarkPlugins={[remarkGfm]}
                  >
                    { contentData.guide }
                  </ReactMarkdown>
                </div>

                {!isLoading &&
                  <div className="flex justify-center flex-wrap space-x-3 mt-5">
                    <Button className="mb-2" disabled={disableButton} onClick={generateFlashcard}> Generate Flashcard</Button>
                    <Link 
                      className={cn(buttonVariants({ size: "default" }), "mb-2")}
                      href={`/chat/${contentId}`}
                    > 
                      Chat with Document
                    </Link>
                  </div>
                }   
              </section>
            :
              <section className="flex justify-center flex-wrap space-x-3 mt-10">
                <>
                  <Button className="mb-4" disabled={disableButton} onClick={generateStudyGuide}> Generate Study Guide</Button>
                  <Button className="mb-4" disabled={disableButton} onClick={generateFlashcard}> Generate Flashcard</Button>
                  <Link 
                    className={cn(buttonVariants({ size: "default" }), "mb-4")}
                    href={`/chat/${contentId}`}
                  > 
                    Chat with Document
                  </Link>
                </>
              </section>
            }

            {generatingGuide &&
              <section className="text-center my-10"> 
                <div className="border rounded-xl w-fit mx-auto px-10 bg-slate-50/25">
                  <Loader />
                  <p className="font-medium -mt-5 mb-7">Generating Study Guide</p>
                </div>
              </section>
            }

            {generatingFlashcard &&
              <section className="text-center my-10"> 
                <div className="border rounded-xl w-fit mx-auto px-10 bg-slate-50/25">
                  <Loader />
                  <p className="font-medium -mt-5 mb-7">Please wait while generating flashcard.</p>
                </div>
              </section>
            }

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
        destination: `/login?redirect_page=/study-guide/${contentId}`,
        permanent: false,
      },
    };
  }

  let serverContent;

  await fetch(customUrl(`/api/study-guide/get/${contentId}`), {
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
