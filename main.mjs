import { EventSubChannelHypeTrainBeginEvent, EventSubChannelFollowEvent } from '@twurple/eventsub';
import countdown from 'countdown';
import { process } from 'process';
//import { followAgeListener } from './commands/twitch/followage.mjs';
import { ttvchatClient, eventListener, discordClient } from './authhandler.mjs';
import * as fs from 'fs';
import { playAudioFile } from 'audic';
import Audic from 'audic';
import { ping } from './commands/twitch/ping.mjs';
import { twitchWebhooks } from './twitch/twitchwebhook.mjs'
//import { exampleEmbed } from './embed.mjs';

const prefix = "!"

import dotenv from 'dotenv';
import { apiClient } from './authhandler/ttvEventSub.mjs';
dotenv.config();


const ttvEventLog = process.env.discordTTVLogChannel;
const ttvLiveChannel = process.env.discordTTVLiveChannel;


async function main() {
	ttvchatClient.onMessage((channel, user, message, broadcasterID) => {
		if (message === '!ping') {
			ping();
		}
		else if (message === '!dice') {
			const diceRoll = Math.floor(Math.random() * 6) + 1;
			ttvchatClient.say(channel, `@${user} rolled a ${diceRoll}`)
			console.log(`@${user} ran command !dice`);
		} else if (message === '!costream') {
			ttvchatClient.say(channel, 'Tonight we are surviving in the forest together. Joining me we have Askesienne http://twitch.tv/askesienne and Lantheos http://twitch.tv/lantheos. Go check them out and say Hi! You can see all of our views here: https://multistre.am/agent_flame/askesienne/lantheos/layout7/');
			console.log(` @${user} ran command !costream`);
		} else if (message === '!pronouns') {
			ttvchatClient.say(channel, '/me I use they/them! If you would like to be able to set your pronouns on Twitch, I will be able to see them directly in chat using a browser extension. Your pronouns will show up next to your name for anyone to read! Log in with Twitch at https://pronouns.alejo.io/ to adjust your settings. <3');
			console.log(` @${user} ran command !pronouns`);
		} else if (message === '!hello') {
			ttvchatClient.say(channel, `Heya! @${user} My hame is Campfirebot! Nice to meet you!`);
			console.log(` @${user} ran command !hello`);
		} else if (message === '!discord') {
			ttvchatClient.say(channel, 'Join us on Discord for in-game voice, going live alerts, and other chit-chat! https://discord.gg/TbUtUjY');
			console.log(` @${user} ran command !discord`);
		} else if (message === '!stjude') {
			ttvchatClient.say(channel, "This month we are fundraising for St. Jude Children's Research Hospital. It is St. Jude's mission to provide treatment and care to all regardless of race, religion. As well as never leave the family with a bill. https://tiltify.com/@agent_flame/the-campfire-x-st-jude-play-live-2021");
			console.log(` @${user} ran command !stjude`);
		} else if (message === '!zoomzoom') {
			ttvchatClient.say(channel, 'Lets !Race');
			console.log(` @${user} ran command !zoomzoom`);
		} else if (message === '!lurk') {
			ttvchatClient.say(channel, `@${user} has decided to minimize instead of quit! Catch you later!`);
			console.log(` @${user} ran command !lurk`);
		} else if (message === '!unlurk') {
			ttvchatClient.say(channel, `Welcome Back @${user}`);
			console.log(` @${user} ran command !unlurk`);
		} else if (message === '!commands') {
			ttvchatClient.say(channel, '!ping, !dice, !costream, !pronouns, !hello, !discord, !stjude, !zoomzoom, !lurk, !zoomzoom2, !unlurk, !commands');
			console.log(`@${user} ran command !commands`);
		} else if (message === '!systest') {
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} is testing`);
			//discordClient.channels.cache.get(ttvEventLog).send({embed: exampleEmbed});
			//channel.send({ embeds: [exampleEmbed] });
			ttvchatClient.say(channel, 'Main Bot Test Sent');
			console.log("testing main");
			console.log(`@${user} ran command !systest`);
		} else if (message === '!raidcall') {
			ttvchatClient.say(channel, `"/me RAID FROM THE CAMPFIRE"`);
			console.log(`@${user} ran command !raidcall`);
		}
		/*else if (message === '!bing') {
			ttvchatClient.say(channel, 'BING BONG!');
			playAudioFile('bingbong.mp3');
			const audic = new Audic('bingbong.mp3');
			audic.play();
			audic.addEventListener('ended', () => { audic.distroy(); });
			console.log(`@${user} ran command !bing`);
		}*/
		else if (message === 'hey') {
			ttvchatClient.say(channel, `hello @${user}`);
		}
		else if (message === 'Hey') {
			ttvchatClient.say(channel, `Hello @${user}!`);
		}
		/*else if (message === '!followage') {
			followAgeListener();
		}*/
		else if (message === '!socials') {
			ttvchatClient.say(channel, `Instagram: Agent_Flame Twitter: Agent_Flame Youtube: Agent_FlameTV VOD Archive: Agent Flame Archive`)
		}
		else if (message === '!lurk') {
			ttvchatClient.say(channel, `@${user} has decided to minimize instead of quit! Catch you later!`)
		} else if (message === '!followage') {
			async (follow) => {
				await apiClient.users.getFollowFromUserToBroadcaster(msg.userInfo.userId, msg.channelId);
			}
			if (follow) {
				const currentTimestamp = Date.now();
				const followStartTimestamp = follow.followDate.getTime();
				ttvchatClient.say(channel, `@${user} You have been following for ${countdown(new Date(followStartTimestamp))}!`);
			}
			else {
				ttvchatClient.say(channel, `@${user} You are now Following!`);
			}
		} else if (message === `!uptime`) {
				//const uptime = "time";
				const stream = apiClient.streams.getStreamByUserId(broadcasterID);
				const uptime = countdown(new Date(stream.startDate));
				ttvchatClient.say(channel, `${user}, the stream has been live for ${uptime}`);
		}
		/*else if (message === '!caster') {
			ttvchatClient.say(channel, `if you like me, then you'll like my friend ____, they where last seen playing ____ at https://twitch.tv/______`)
		}*/
		});
		//const FollowEvent = await eventListener.EventSubChannelFollowEvent();


		ttvchatClient.onSub((channel, user) => {
			ttvchatClient.say(channel, `Welcome around the campfire @${user}!`);
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} just subscribed`);
			fs.writeFile(`./twitch/events/subscriber.txt`, user, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});

		ttvchatClient.onRaid((channel, user, raidInfo) => {
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} just raided, ${raidInfo}`);
		});

		ttvchatClient.onHost((channel, target, viewers) => {
			ttvchatClient.say(channel, `Now hosting @${target}`);
		});

		ttvchatClient.onUnhost((channel) => {
			console.log('Unhosted current user');
		});

		ttvchatClient.onBan((channel, user) => {
			ttvchatClient.say(channel, `${user}... I litterally have no idea who you are. Have a good one!`)
		});

		ttvchatClient.onResub((channel, user, subInfo) => {
			ttvchatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
			discordClient.channels.cache.get(ttvEventLog).send(`@${user} just resubscribed`);
			fs.writeFile(`,/twitch/events/subscriber.txt`, user, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});

		ttvchatClient.onSubGift((channel, user, subInfo) => {
			ttvchatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}! ${user} welcome around the campfire!`);
			discordClient.channels.cache.get(ttvEventLog).send(`@${subInfo.gifter} just gifed a subscription to ${user}!`);
			fs.writeFile(`./twitch/events/subscriber.txt`, user, err => {
				if (err) {
					console.error(err)
					return
				}
			})
		});
}
main();
twitchWebhooks();
export { };