from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import pymysql

conn = pymysql.connect(host='localhost', 
                        port=3306, 
                        user='root', 
                        password='9876', 
                        db='nyamnyam_seoul', 
                        charset='utf8')
curs = conn.cursor(pymysql.cursors.DictCursor) 

options = webdriver.ChromeOptions()
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko")
driver = webdriver.Chrome('D:\chromedriver\chromedriver.exe',options=options)
# 각자의 위치에 있는 크롬드라이버 경로 지정
driver.implicitly_wait(10)

sql = "select REL_NUM, REL_NAME from restaurant_list"
curs.execute(sql)
rows = curs.fetchall()
#print(rows)

try :
    for name in rows:
        print('name : ' + name['REL_NAME'])
        url_base = 'https://search.naver.com/search.naver?where=post&sm=tab_jum&query='
        url = url_base + name['REL_NAME']
        driver.get(url)
        driver.implicitly_wait(10)
        for list in driver.find_elements_by_css_selector('#main_pack > div.blog.section._blogBase._prs_blg > ul.type01 > li'):
            contents = list.find_elements_by_css_selector('dl > dt > a')
            print(contents)

except Exception as e:
    print(e)

finally:
    print("END")
    driver.quit()
    conn.close()