import Head from "next/head";
import { useState } from "react";
import { Container, Paper, Label, Textarea, Button } from "../components/core";
import ExamplesDropdown from "../components/ExamplesDropdown";

export default function Home() {
  const [abstract, setAbstract] = useState();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setStatus("⏳ The Model is Generating the Title");
    setLoading(true);

    try {
      const raw_response = await fetch(
        "https://qiyvjvwm57flqmhhawjq4t4y3u0djofs.lambda-url.us-east-1.on.aws/gradientfire/abstract2title",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "S76UrNGVw84VbOyaTMXvy1IUxVpKGZtz9GeSRVx2",
          },
          method: "POST",
          body: JSON.stringify(abstract),
        }
      );
      const response = await raw_response.json();
      console.log(response);
      const output = response.output;
      setTitle(output);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Please try again.");
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Abstract2Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className="flex flex-col w-full flex-1 px-20"> */}
      <Container>
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl mt-4">
            🤖{" "}
            <span className="font-bold text-blue-600">
              Abstract2Title Generator
            </span>{" "}
            ✒️
          </h1>

          <p className="mt-3 text-lg sm:text-xl text-gray-700">
            A T5-based Sequence to Sequence Model for Generating Titles for ML
            Papers using the Abstract{" "}
          </p>
        </div>

        <Paper>
          <div className="flex justify-between items-center mb-2">
            <Label>About the project</Label>
            <a
              href="https://github.com/nerdimite/abstract-to-title-generator"
              target="_blank"
            >
              <div
                className="py-2 px-3  inline-block rounded-full \
                  bg-blue-200 text-sm hover:cursor-pointer hover:ring-1 hover:ring-blue-600 \
                  transition ease-in-out duration-200"
              >
                <span className="font-semibold text-blue-600">
                  Get Source Code{" "}
                </span>
                💻
              </div>
            </a>
          </div>
          <p className="mb-2 text-base text-gray-700">
            Writing a research paper is one thing and coming up with a catchy
            title for it is another. This tool can help you in generating titles
            for your papers by taking the abstract as the input. If you want to
            just test the model, you can choose an example abstract from the
            dropdown on the right.
          </p>

          <div className="flex justify-between items-center flex-wrap">
            <Label emoji="📜">Abstract of the Paper</Label>
            <ExamplesDropdown
              setAbstract={(val) => {
                document.getElementById("abstract").value = val;
                setAbstract(val);
              }}
            />
          </div>
          <Textarea
            id="abstract"
            placeholder="Enter the Abstract of an AI Paper"
            onChange={(e) => {
              setAbstract(e.target.value);
            }}
          />
          <div className="flex justify-between items-start flex-wrap">
            <p>
              <span className="font-semibold text-gray-700">Status:</span>{" "}
              {status}
            </p>
            <div className="flex items-center justify-center mt-2">
              <Button
                className="w-full"
                disabled={loading}
                onClick={async () => {
                  await predict();
                }}
              >
                Generate Title 📝
              </Button>
            </div>
          </div>
        </Paper>

        <Paper>
          <Label emoji="✒️">Generated Title</Label>
          <div className="text-gray-600 text-lg border p-2">{title}</div>
        </Paper>
      </Container>
    </div>
  );
}
