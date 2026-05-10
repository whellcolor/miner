import requests

url = "https://api.etherscan.io/v2/api?apikey=8WRIDBMW18HXAB44ATGX7IPYGSHXVXDVC3&address=0xd8519a8b8825aa0dcc73aad572f447fae102fe88&module=DappMiner&action=balancemulti&tag=0x10d4f&chainid=8453"

response = requests.get(url)

print(response.text)
