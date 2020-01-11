# curl -X POST \
#   http://localhost:8090/auth/signUp \
#   -H 'cache-control: no-cache' \
#   -H 'Content-Type: application/json' \
#   -d '{
#     "userName":"Banner2",
#     "password":"IAMGROOT",
#     "confirmPassword":"IAMGROOT"
# }'
sleep 2;
response=$(curl -X POST \
  http://localhost:8090/auth/signIn \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: ccad5600-7fca-4044-a2ee-411fbce07956' \
  -H 'cache-control: no-cache' \
  -d '{
    "userName": "BANNER1",
    "password": "IAMGROOT"
}')
# echo "${response}"
user_token=$(echo $response | cut -d':' -f3 | sed -e "s/\"//g" | sed -e "s/}//g" )
echo "${user_token}"

curl -X GET http://localhost:8090/book/yourHolyProperty \
  -H 'Authorization: Bearer $user_token'  \
  -H 'cache-control: no-cache'
 