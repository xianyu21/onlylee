# -*- coding: utf-8 -*-
"""
cron: 7 11 * * *
new Env('掘金');
"""

import requests
import random
import string

from notify_mtr import send
from utils import get_data


class Juejin:
    def __init__(self, check_items):
        self.check_items = check_items
        self.base_url = "https://api.juejin.cn/"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        }

    # def sign(self, cookie):
    #     sign_url = f"{self.base_url}growth_api/v1/check_in"
    #     return requests.post(
    #         url=sign_url, headers=self.headers, cookies={"Cookie": cookie}
    #     ).json()

    # def lottery(self, cookie):
    #     lottery_url = f"{self.base_url}growth_api/v1/lottery/draw"
    #     return requests.post(
    #         url=lottery_url, headers=self.headers, cookies={"Cookie": cookie}
    #     ).json()

    def lottery_lucky(self, cookie):
        lottery_lucky_url = f"{self.base_url}growth_api/v1/lottery_lucky/my_lucky"
        
        return requests.post(
            url=lottery_lucky_url, headers=self.headers, cookies={"Cookie": cookie}
        ).json()
    
    def lottery_history(self, cookie):
        lottery_history_url = f"{self.base_url}growth_api/v1/lottery_history/global_big"
        rs = requests.post(
            url=lottery_history_url, headers=self.headers, cookies={"Cookie": cookie}
        ).json()
        return rs['data']['lotteries'][random.randint(0,9)]['history_id']
    
    def dip_lucky(self, cookie,historyId):
        print(cookie,historyId)
        dip_lucky_url = f"{self.base_url}growth_api/v1/lottery_lucky/dip_lucky"
        data = {
            'aid':2608,
            'uuid':historyId,
            'spider':0
        }
        rs = requests.post(
            url=dip_lucky_url,data=data, headers=self.headers, cookies={"Cookie": cookie}
        ).json()
        print(rs)
        print(rs['data']['has_dip'])
        print(rs['data']['has_dip']  == 'True')
        if rs['data']['has_dip'] == 'True':
            return '1'
        else:
            return '今天你已经沾过喜气，明天再来吧' 
    
    def main(self):
        msg_all = ""
        for i, check_item in enumerate(self.check_items, start=1):
            cookie = str(check_item.get("cookie"))
            # sign_msg = self.sign(cookie)["err_msg"]
            # lottery_msg = self.lottery(cookie)["err_msg"]
            luckyTotal= self.lottery_lucky(cookie)['data']['total_value']
            historyId = self.lottery_history(cookie)
            dip_lucky_msg = self.dip_lucky(cookie,historyId)
            print(dip_lucky_msg)
            print('-----------------------------------2')
            msg = (
                f"账号 {i}"
                # + "\n------ 掘金签到结果 ------\n"
                # + sign_msg
                # + "\n------ 掘金抽奖结果 ------\n"
                # + lottery_msg
                + "\n------ 幸运值结果 ------\n"
                + str(luckyTotal)+'/6000'
                + "\n------ 沾喜气结果 ------\n"
                + dip_lucky_msg
            )
            msg_all += msg + "\n\n"
        return msg_all


if __name__ == "__main__":
    _data = get_data()
    _check_items = _data.get("JUEJIN", [])
    result = Juejin(check_items=_check_items).main()
    send("掘金", result)
