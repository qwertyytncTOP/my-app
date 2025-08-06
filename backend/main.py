from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from pydantic import BaseModel
import aiohttp
import asyncio
from lxml.html import fromstring
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import requests

app = FastAPI()

# Добавляем поддержку CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://my-landing-blush.vercel.app"],  # Замените на соответствующий порт вашего React-приложения
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
TELEGRAM_BOT_TOKEN = '8295200447:AAFRjQJPkG5sbi_9alvkvy-_RKwibaF-Id4'
CHAT_ID = '-1002739544411'


@app.post("/submit/")
async def submit_data(
        text1: str = Form(...),
        text2: str = Form(...),
        file1: UploadFile = File(...),
        file2: UploadFile = File(...),
        text3: str = Form(...)
):
    # Отправка текстовых данных в Telegram
    message = f"ID: {text1}\nСпособ оплаты: {text2}\nID Telegram: {text3}"
    #response = requests.post(
    #    f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
    #    json={"chat_id": CHAT_ID, "text": message}
    #)

    # Отправка файлов в Telegram
    for file in [file1, file2]:
        content = await file.read()
        files = {"document": (file.filename, content)}
        response_files = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument",
            data={"chat_id": CHAT_ID, "caption": message},
            files=files
        )


    return {"status": "success", "message": "Data submitted successfully"}

async def fetch_html(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()


@app.post("/fetch-data")
async def fetch_data():
    try:
        URL = 'https://stavka.tv/predictions?period=2h&predictorTypes=expert'
        html_content = await fetch_html(URL)

        parser = fromstring(html_content)
        data_list = []
        for i in range(1,10):
            try:
                command1 = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[1]/a/div[2]/div[1]/span[1]')[0].text
                command2 = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[1]/a/div[2]/div[1]/span[3]')[0].text
                time = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[1]/a/div[2]/div[2]/span[2]')[0].text
                date = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[1]/a/div[2]/div[2]/span[3]')[0].text
                koef = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/div[1]/text()')
                bet = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/span')[0].text
                description = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/div[2]/text()')

                time_format = "%H:%M"
                start_time = datetime.strptime(time, time_format)
                new_time = start_time + timedelta(hours=3)
                new_time_str = new_time.strftime("%H:%M")
                if description == []:
                    description_text = ""
                    for j in range(1, 10):
                        try:
                            try:
                                text = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/div[2]/p[{j}]/text()')
                                description_text += text[0]
                            except IndexError:
                                pass
                            try:
                                span = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/div[2]/p[{j}]/span')[0].text
                                description_text += span[0]
                            except IndexError:
                                pass
                            try:
                                spantext = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/div[2]/p[{j}]/span/text()')
                                description_text += spantext[0]
                            except IndexError:
                                pass
                            try:
                                strong = parser.xpath(f'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div/div/div[4]/div[1]/div/div/div[{i}]/div[1]/div[2]/div[2]/p[{j}]/strong')[0].text
                                description_text += strong[0]
                            except IndexError:
                                pass

                        except IndexError:
                            continue
                    description = [description_text]

                data_list.append({
                    "command1": command1,
                    "command2": command2,
                    "time": new_time_str,
                    "date": date,
                    "coefficient": koef,
                    "bet": bet,
                    "description": description
                })
                #print(command1)
                #print(command2)
                #print(time)
                #print(date)
                print(koef)
                #print(bet)
                #print(description)
            except IndexError:
                break

        if len(data_list) > 0:
            print(data_list)
            return {"data": data_list}
        else:
            return {"text_content": "No text content found."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")
