yarn lint && \
yarn build && \
rsync -a --delete ~/web/speechki/dist/* ~/web/speechki/firebase/public && \
cd ~/web/speechki/firebase/ && firebase deploy && \
echo "Успех"