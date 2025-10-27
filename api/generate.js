
const { OpenAI } = require('openai');

module.exports = async (req, res) => {
  const { prompt, lang } = req.body;

  // A chave de API será lida das "Environment Variables" da Vercel
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    res.status(500).send({ error: 'A chave da API não foi configurada no servidor.' });
    return;
  }

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Gere um código em ${lang} que faça o seguinte: ${prompt}. O código deve ser bem comentado e seguir as melhores práticas da linguagem.`,
        },
      ],
    });

    const codigo = response.choices[0].message.content;
    res.status(200).send({ codigo });

  } catch (error) {
    console.error("Erro ao chamar a API da OpenAI:", error);
    res.status(500).send({ error: 'Erro ao gerar o código.' });
  }
};
