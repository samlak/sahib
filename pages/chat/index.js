import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { customUrl } from "@/lib/url";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";
import Loader from "@/components/Loader/Loader";

export default function Dashboard({ history }) {
  const [historyData, setHistoryData] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const demo = [
      {
        _id: "4433",
        topic: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        documentName: null
      },
      {
        _id: "4433",
        topic: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        documentName: null
      },
      {
        _id: "4433",
        topic: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        documentName: null
      },
      {
        _id: "4433",
        topic: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        documentName: null
      },
    ]
    setHistoryData(demo);
    setLoadingContent(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Chatbot | Sahib AI</title>
      </Head>
      <div>
        <Layout activeTab="Chatbot">
          <main className="text-center">
            {loadingContent ? (
              <div className="text-center my-20">
                <Loader />
              </div>
            ) : (
              <div className="mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-xl">
                    Chat with your documents
                  </h2>
                  <Button asChild>
                    <Link href="/study-assistant" className="px-3">
                      <Bot className="mr-2 h-4 w-4" />
                      Start Chatting
                    </Link>
                  </Button>
                </div>

                {historyData.length ? (
                  <div className="flex flex-wrap justify-between">
                    {historyData.map((historyInfo, key) => (
                      <div
                        key={key}
                        className="my-2 py-3 px-3 rounded-lg border bg-card text-card-foreground shadow-sm w-[49%] text-sm flex items-center"
                      >
                        <Link
                          href={`/study-guide/${historyInfo._id}`}
                          className="hover:text-blue-700 hover:underline font-medium"
                        >
                          {historyInfo["topic"] ? historyInfo["topic"] : historyInfo["documentName"]}
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto my-20 text-center font-semibold text-2xl">
                    <p className="mx-4">
                      {"You do not have any document to chat with. Click here to upload  "}
                      <Link
                        href="/study-assistant"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {"your document."}
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}
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
        destination: "/login?redirect_page=/study-guide",
        permanent: false,
      },
    };
  }

  let history;

  await fetch(customUrl("/api/study-guide/get"), {
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
      history = data.data;
    });

  return {
    props: {
      session,
      history,
    },
  };
}
