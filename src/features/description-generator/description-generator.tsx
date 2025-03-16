import { useEffect, useState } from "react";
import Input from "@/shared/components/input/input";
import Select from "@/shared/components/select/select";
import TextareaField from "@/shared/components/textarea-field/textarea-field";
import { tonality } from "./lib/tonality";
import "./description-generator.scss";
import Button from "@/shared/components/button/button";
import { descriptionGeneratorAPI } from "@/api";
import Tooltip from "@/shared/components/tooltip/tooltip";
import IconQuestion from "@/shared/components/icons/IconQuestion";
import Loader from "@/shared/components/loader/loader";

import { retrieveLaunchParams } from "@telegram-apps/sdk";

const DescriptionGenerator = () => {
  const [productName, setProductName] = useState("");
  const [length, setLength] = useState("1000");
  const [textTone, setTextTone] = useState<string | string[]>("");
  const [generationQuery, setGenerationQuery] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [minusWords, setMinusWords] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userPlatform, setUserPlatform] = useState<string | null>(null);

  useEffect(() => {
    try {
      const platform = retrieveLaunchParams().tgWebAppPlatform;
      console.log(platform);

      setUserPlatform(platform);
    } catch {
      setUserPlatform("unknown");
    }
  }, []);

  const handleProductNameChange = (newValue: string) => {
    console.log();

    setProductName(newValue);
  };

  const handleLengthChange = (newValue: string) => {
    setLength(newValue);
  };

  const handleTextToneChange = (newValue: string | string[]) => {
    setTextTone(newValue);
  };

  const handleGenerationQueryChange = (newValue: string) => {
    setGenerationQuery(newValue);
  };

  const handleKeyWordsChange = (newValue: string) => {
    setKeyWords(newValue);
  };

  const handleMinusWordsChange = (newValue: string) => {
    setMinusWords(newValue);
  };

  const isFormValid = () => {
    return length.trim() !== "" && textTone !== "" && generationQuery.trim() !== "";
  };

  const handleSend = () => {
    if (!isFormValid()) return;
    setResponse(null);
    setIsLoading(true);
    setHasError(false);

    const body = {
      advantages: generationQuery.split(" ").map((item) => item.trim()),
      auth_token: "HzQpUaH8J04014IdBbO2ImZktHQL2kMX8NYbxWB56eG8COgEtFOu4whNIrJASjredaGHh_kYzrKgirnHJ3qCLg",
      key_words: keyWords.split(" ").map((item) => item.trim()),
      length: `char_${length}`,
      minus_words: minusWords.split(" ").map((item) => item.trim()),
      product_name: productName,
      text_tone: Array.isArray(textTone) ? textTone[0].toLocaleLowerCase() : textTone.toLocaleLowerCase(),
    };

    descriptionGeneratorAPI
      .makeReport(body)
      .then((res) => {
        setResponse(res.data.desc);
      })
      .catch(() => {
        setResponse(null);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      alert("Ответ скопирован в буфер обмена!");
    }
  };

  const createDownloadFileTXT = (_context: string) => {
    const blob = new Blob([_context], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-text.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    response && createDownloadFileTXT(response);
  };

  return (
    <div className="description-generator">
      <div className="description-generator__header">
        <p className="description-generator__title">Создать описание</p>
        <Tooltip
          content={
            <div className="card-description-list">
              <div className="card-description-list__item">
                <div className="card-description-list__item-title">
                  <span className="card-description-list__item-title--number">1</span>
                  Формулируйте запрос четко и разбивайте задачи на этапы.
                </div>
                <p className="card-description-list__item-description">
                  Указывайте конкретные детали и цель генерации, отдельно создавая заголовки, описания и характеристики.
                </p>
              </div>
              <div className="card-description-list__item">
                <div className="card-description-list__item-title">
                  <span className="card-description-list__item-title--number">2</span>
                  Редактируйте текст, добавляя уникальность и стиль бренда.
                </div>
                <p className="card-description-list__item-description">
                  Уточняйте сгенерированные тексты, чтобы они соответствовали вашему тону и содержали индивидуальные особенности.
                </p>
              </div>
              <div className="card-description-list__item">
                <div className="card-description-list__item-title">
                  <span className="card-description-list__item-title--number">3</span>
                  Тестируйте варианты и анализируйте их эффективность.
                </div>
                <p className="card-description-list__item-description">
                  Создавайте несколько версий текста, проверяйте их отклик у аудитории и выбирайте наиболее результативный.
                </p>
              </div>
            </div>
          }
        >
          <div className="tooltip-activator__question">
            <IconQuestion />
          </div>
        </Tooltip>
      </div>

      <div className="description-generator__inputs">
        <Input placeholder="Ссылка на товар или артикул" value={productName} onChange={handleProductNameChange} label="Продукт" />

        <Input placeholder="Количество символов" value={length} onChange={handleLengthChange} type="number" label="Ограничение по символам" />

        <Select modelValue={textTone} onUpdateModelValue={handleTextToneChange} label="Тональность" options={tonality} />

        <TextareaField
          label="Запрос для генерации"
          placeholder="Введите запрос для генерации"
          value={generationQuery}
          onChange={handleGenerationQueryChange}
          onClear={() => setGenerationQuery("")}
        />

        <TextareaField
          label="Ключевые слова"
          placeholder="Введите ключевые слова"
          value={keyWords}
          onChange={handleKeyWordsChange}
          onClear={() => setKeyWords("")}
        />

        <TextareaField
          label="Минус слова"
          placeholder="Введите слова исключения"
          value={minusWords}
          onChange={handleMinusWordsChange}
          onClear={() => setMinusWords("")}
        />

        <div className="description-generator__generate">
          <Button
            className="description-generator__generate-btn"
            onClick={handleSend}
            variant="primary"
            label="Сгенерировать"
            disabled={!isFormValid() || isLoading}
          />
        </div>

        {!response && (
          <div className="description-generator__response">
            {isLoading ? (
              <Loader isLoading={isLoading} />
            ) : hasError ? (
              <p>Во время генерации произошла не известная ошибка, попробуйте еще раз</p>
            ) : (
              <p>Здесь будет описание сгенерированное по вашему запросу</p>
            )}
          </div>
        )}

        {response && <TextareaField label="" placeholder="" value={response} onChange={() => console.log()} />}

        <Button className="description-generator__copy-btn" onClick={handleCopy} label="Скопировать" disabled={!response} />

        {userPlatform === "tdesktop" && (
          <Button className="description-generator__copy-btn" onClick={handleDownload} label="Скачать файл" disabled={!response} />
        )}
      </div>
    </div>
  );
};

export default DescriptionGenerator;
