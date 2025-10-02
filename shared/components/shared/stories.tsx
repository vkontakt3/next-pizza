"use client";

import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import toast from "react-hot-toast";

interface Props {
	className?: string;
}

export default function Stories({ className }: Props) {
	const [stories, setStories] = React.useState<IStory[]>([]);
	const [open, setOpen] = React.useState(false);
	const [selectedStory, setSelectedStory] = React.useState<IStory>();

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories();
	}, []);

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		} else {
			toast.error("История пока что пустая 😕");
		}
	};

	return (
		<Container className={cn("my-10", className)}>
			{/* Горизонтальный скролл */}
			<div className="flex gap-4 overflow-x-auto scrollbar-none py-2">
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className="flex-shrink-0 w-48 h-64 bg-gray-200 rounded-md animate-pulse"
						/>
					))}

				{stories.map((story) => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						className="flex-shrink-0 w-48 h-64 rounded-md cursor-pointer object-cover"
						src={story.previewImageUrl}
						alt="story"
					/>
				))}
			</div>

			{/* Модалка со сторис */}
			{open && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
					<div className="relative w-full max-w-md sm:max-w-lg">
						<button
							className="absolute -right-10 -top-5 z-50"
							onClick={() => setOpen(false)}
						>
							<X className="w-8 h-8 text-white/50" />
						</button>

						<ReactStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={
								selectedStory?.items.map((item) => ({ url: item.sourceUrl })) ||
								[]
							}
							defaultInterval={3000}
							width="100%"
							height={800}
						/>
					</div>
				</div>
			)}
		</Container>
	);
}
