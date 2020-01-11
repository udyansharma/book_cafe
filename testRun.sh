echo "Signing Up"

curl -X POST \
  http://localhost:8090/auth/signUp \
  -H 'cache-control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
    "userName":"Tony",
    "password":"RANGAROO",
    "confirmPassword":"RANGAROO"
}'

echo "Signing In"

response=$(curl -X POST \
  http://localhost:8090/auth/signIn \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: ccad5600-7fca-4044-a2ee-411fbce07956' \
  -H 'cache-control: no-cache' \
  -d '{
    "userName": "Tony",
    "password": "RANGAROO"
}')
# echo "${response}"
user_token=$(echo $response | cut -d':' -f3 | sed -e "s/\"//g" | sed -e "s/}//g" )
echo "${user_token}"
echo ""
echo "Publishing Your Book"

curl -X POST \
  http://localhost:8090/book/sellYourBookForGood \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"title":"THE DEC HULK",
	"description": "It'\''s BRUCE'\''S story",
	"price":"1000"
}'
echo ""
echo "Getting This Author's Books"

curl -X GET http://localhost:8090/book/yourHolyProperty \
  -H "Authorization: Bearer $user_token"  \
  -H 'cache-control: no-cache'
echo ""
echo "Getting All Books"

curl -X GET \
http://localhost:8090/book/getBookList \
-H "Authorization: Bearer $user_token" \
-H 'cache-control: no-cache'
echo ""
echo "Getting Book By Id"

curl -X GET \
  'http://localhost:8090/book/getBookByTitle?title=%22THE%20INC%20HULK-2%22' \
  -H 'Authorization: Bearer ' \
  -H 'cache-control: no-cache'
echo ""
echo "Getting Book With Id 1"

curl -X GET \
  'http://localhost:8090/book/getBookById?id=%221%22' \
  -H "Authorization: Bearer $user_token" \
  -H 'cache-control: no-cache'
echo ""
echo "Unpublishing THE Inc HULK-22"

curl -X POST \
  http://localhost:8090/book/takeAwayAllTheGoodness \
  -H "Authorization: Bearer $user_token"  \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"title":"THE Inc HULK-22"
}'

echo ""
echo "Getting Deleted Book By Title to Test"

curl -X GET \
  'http://localhost:8090/book/getBookByTitle?title=%22THE%20INC%20HULK-2%22' \
  -H 'Authorization: Bearer ' \
  -H 'cache-control: no-cache'
echo ""
echo "Getting Deleted Book By Id to Test"

curl -X GET \
  'http://localhost:8090/book/getBookById?id=%221%22' \
  -H "Authorization: Bearer $user_token" \
  -H 'cache-control: no-cache'