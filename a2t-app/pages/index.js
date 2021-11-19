import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Label,
  Textarea,
  Button,
  BadgeButton,
} from "../components/core";
import ExamplesDropdown from "../components/ExamplesDropdown";

export default function Home() {
  const [abstract, setAbstract] = useState();
  const [defaultAbstract, setDefaultAbstract] = useState();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    await load_model();
  }, []);

  const load_model = async () => {
    setStatus(
      "🚧 Loading Model into Memory, Please Wait for around 30 seconds..."
    );
    setLoading(true);

    try {
      const raw_response = await fetch(
        "https://api.cellstrathub.com/synchronous",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": "CJaYCj7gL3azRRolVuEcm8G9Baam9b8L7m9gW0sl",
          },
          method: "POST",
          body: JSON.stringify({
            service_id: "abstract2title",
            input: { abstract: "Random Text to Ping Model" },
          }),
        }
      );
      const response = await raw_response.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  const predict = async () => {
    setStatus("⏳ The Model is Generating the Title ...");
    setLoading(true);

    try {
      const raw_response = await fetch(
        "https://api.cellstrathub.com/synchronous",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": "CJaYCj7gL3azRRolVuEcm8G9Baam9b8L7m9gW0sl",
          },
          method: "POST",
          body: JSON.stringify({
            service_id: "abstract2title",
            input: { abstract: abstract },
          }),
        }
      );
      const response = await raw_response.json();
      console.log(response);
      const body = JSON.parse(response["body"]);
      const output = JSON.parse(body["output"]);
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
          <h1 className="text-4xl font-bold text-blue-600 mt-4">
            🤖 Abstract2Title Generator ✒️
          </h1>

          <p className="mt-3 text-xl text-gray-700">
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
              <BadgeButton>Get Source Code 💻</BadgeButton>
            </a>
          </div>
          <p className="mb-2 text-base text-gray-700">
            Writing a research paper is one thing and coming up with a catchy
            title for it is another. This tool can help you in generating titles
            for your papers by taking the abstract as the input. If you want to
            just test the model, you can choose an example abstract from the
            dropdown on the right.
          </p>

          <div className="flex justify-between items-center">
            <Label>Abstract of the Paper 📜</Label>
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
          <div className="flex justify-between items-start">
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
          <Label>Generated Title ✒️</Label>
          <div className="text-gray-600 text-lg border p-2">{title}</div>
        </Paper>
      </Container>
    </div>
  );
}
