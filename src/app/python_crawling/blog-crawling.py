from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pymysql
import datetime

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
    for row in rows:
        url_base = 'https://search.naver.com/search.naver?where=post&sm=tab_jum&query='
        url = url_base + row['REL_NAME']
        driver.get(url)
        print(url)
        driver.implicitly_wait(10)
        for list in driver.find_elements_by_css_selector('#main_pack > div.blog.section._blogBase._prs_blg > ul.type01 > li'):                     
            day = list.find_element_by_class_name('txt_inline').text
            # print(day[:-1])
            contents = list.find_elements_by_css_selector('dl > dt > a')
            title = [c.get_attribute('title') for c in contents][0]
            href = [c.get_attribute('href') for c in contents][0]
            # print(href)
            now = datetime.datetime.now()
            date = now.strftime("%Y%m%d")
            time = now.strftime("%H%M%S")
            print(date + time)
            params = (row['REL_NUM'], title, href, day[:-1], date, time)
            sql = 'INSERT INTO restaurant_blog (REL_NUM, BLOG_CONTENT_TITLE, BLOG_CONTENT_URL, BLOG_CONTENT_CREDAT, BLOG_CREDAT, BLOG_CRETIM) VALUES(%s, %s, %s, %s, %s, %s)'

            curs.execute(sql, params)
            conn.commit()                   
    print('완료---------------------------------------')
except Exception as e:
    print(e)

finally:
    print("END")
    driver.quit()
    conn.close()