import Head from "next/head";
import Layout from "@/components/Layout";
import ChatForm from "@/components/Form/chat-form";
import { getSession, useSession } from "next-auth/react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from "react";
import { useChat } from 'ai/react';
import { customUrl } from "@/lib/url";

export default function Chatbot({ serverContent }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [contentData, setContentData] = useState({
    topic: "",
    documentName: null,
    pineconeId: null,
    guide: null
  });

  const { messages,  append, isLoading } = useChat({
    api: "/api/chat/topic",
    body: { 
      topic: contentData.topic,
      guide: contentData.guide
    }
    
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    append({
      role: "user",
      content: query,
    })
  }


  const handleEnter = (e) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };


  useEffect(() => {
    if(serverContent) {
      setContentData(serverContent);
    }
  }, [serverContent]);
  
  return (
    <div>
      <Head>
        <title>Chatbot | Sahib AI</title>
      </Head>
      <div>
        <Layout activeTab="Chatbot">
          <main className="-mx-4 -my-6 lg:-mx-8 flex flex-col">
            {/* <h1 className="text-3xl font-semibold text-center">
              Chatbot
            </h1> */}


            <div className="flex-grow pb-24">
              <div className="h-full">
                <div className="overflow-y-auto">

                  <div className={"bg-slate-200/75"}>
                    <div className="flex items-center justify-start max-w-full sm:max-w-4xl  mx-auto overflow-hidden px-2 sm:px-4">
                      <div className="flex flex-col w-full">
                        <div className="w-full text-gray-900 p-2 sm:p-4 overflow-wrap break-words">
                          <span
                            className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-xs sm:text-sm font-medium ring-1 ring-inset bg-indigo-400/10 text-indigo-400 ring-indigo-400/30`}
                          >
                            {'AI'}
                          </span>
                          <div className="mx-auto max-w-full">
                            <ReactMarkdown
                              className="markdown text-xs sm:text-sm md:text-base leading-relaxed"
                              remarkPlugins={[remarkGfm]}
                            >
                              {`You can ask me any question regarding: ${contentData.topic}`}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {messages.map((message, index) => {
                    const isApiMessage = message.role === 'assistant';
                    const messageClasses = `${
                      isApiMessage ? 'bg-slate-200/75' : 'bg-white'
                    }`;

                    return (
                      <div key={`chatMessage-${index}`} className={messageClasses}>
                        <div className="flex items-center justify-start max-w-full sm:max-w-4xl  mx-auto overflow-hidden px-2 sm:px-4">
                          <div className="flex flex-col w-full">
                            <div className="w-full text-gray-900 p-2 sm:p-4 overflow-wrap break-words">
                              <span
                                className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-xs sm:text-sm font-medium ring-1 ring-inset ${
                                  isApiMessage
                                    ? 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/30'
                                    : 'bg-purple-400/10 text-purple-400 ring-purple-400/30'
                                }`}
                              >
                                {isApiMessage ? 'AI' : 'YOU'}
                              </span>
                              <div className="mx-auto max-w-full">
                                <ReactMarkdown
                                  className="markdown text-xs sm:text-sm md:text-base leading-relaxed"
                                  remarkPlugins={[remarkGfm]}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>


            <div className="fixed w-full bottom-0 flex bg-gradient-to-t from-slate-200 to-slate-200/0 justify-center">
              <ChatForm
                loading={loading}
                error={error}
                query={query}
                // textAreaRef={textAreaRef}
                handleEnter={handleEnter}
                handleSubmit={handleSubmit}
                setQuery={setQuery}
              />
            </div>

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
        destination: "/login?redirect_page=/chat",
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
