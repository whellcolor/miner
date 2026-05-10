# Example: Get latest block number on Ethereum
import requests
import json

response = requests.post(
    "https://1.rpc.thirdweb.com/3ea7634968af4a7c90b17914bcf7d4bb",
    headers={"Content-Type": "application/json"},
    json={
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": [],
        "id": 1
    }
)
data = response.json()
print("Latest block number:", int(data["result"], 16))
