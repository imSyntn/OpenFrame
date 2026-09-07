import React, { useCallback, useState } from "react";
import {
  Sparkles,
  Wand2,
  RefreshCw,
  AlertCircle,
  Dices,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  DEFAULT_MODEL,
  MODELS,
  DEFAULT_STYLE,
  SAMPLE_PROMPTS,
  ENHANCERS,
} from "@workspace/constants";
import { Input } from "@workspace/ui/components/input";
import { Palette, Check } from "lucide-react";
import { STYLES } from "@workspace/constants";
import { cn } from "@workspace/ui/lib/utils";
import { Textarea } from "@workspace/ui/components/textarea";
import { Switch } from "@workspace/ui/components/switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@workspace/ui/components/field";
import { ImageGenerateSchema } from "@workspace/schema/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { Badge } from "@workspace/ui/components/badge";
import { useGenerateImage } from "@/hooks";
import { useImageGenerationStore } from "../Provider";

function GroupHeader({
  classNames,
  children,
}: {
  classNames?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-between", classNames)}>
      {children}
    </div>
  );
}

export function ImageGenerateForm() {
  const [showNegative, setShowNegative] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ImageGenerateSchema),
    defaultValues: {
      artStyle: DEFAULT_STYLE,
      model: DEFAULT_MODEL,
      public: true,
      prompt: "",
    },
  });
  const { mutateAsync, isPending } = useGenerateImage();
  const status = useImageGenerationStore((state) => state.status);

  const prompt = useWatch({ control, name: "prompt" }) || "";
  const selectedStyleId = useWatch({ control, name: "artStyle" });
  const isPublic = useWatch({ control, name: "public" });

  const handleSurpriseMe = useCallback(() => {
    const randomPrompt =
      SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];

    if (!randomPrompt) return;

    setValue("prompt", randomPrompt);
  }, [setValue]);

  const handleEnhancePrompt = useCallback(() => {
    if (!prompt.trim()) return;

    const randomEnhancer =
      ENHANCERS[Math.floor(Math.random() * ENHANCERS.length)];

    if (!randomEnhancer) return;

    setIsEnhancing(true);

    setTimeout(() => {
      setValue("prompt", `${prompt.trim()}, ${randomEnhancer}`);
      setIsEnhancing(false);
    }, 1000);
  }, [prompt, setValue]);

  const onSubmit = handleSubmit(async (e) => {
    try {
      await mutateAsync(e);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message;
      if (message) {
        setError("root", { type: "manual", message });
      }
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldSet disabled={isPending || isEnhancing}>
        <FieldGroup className="space-y-4">
          <GroupHeader>
            <FieldLabel className="text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Prompt Description</span>
            </FieldLabel>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSurpriseMe}
                className="text-xs gap-1.5 text-muted-foreground"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Surprise Me</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleEnhancePrompt}
                disabled={!prompt.trim() || isEnhancing}
                className="text-xs gap-1.5 h-8 border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                <Wand2
                  className={`w-3.5 h-3.5 ${isEnhancing ? "animate-spin" : ""}`}
                />
                <span>{isEnhancing ? "Enhancing..." : "Enhance"}</span>
              </Button>
            </div>
          </GroupHeader>

          <div>
            <Textarea
              {...register("prompt")}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to see... (e.g., A futuristic cyberpunk city in neon rain with glowing reflections)"
              className="resize-none text-sm md:text-base leading-relaxed"
              rows={4}
            />
            <span className="text-[11px] text-muted-foreground/70 font-mono text-right inline-block w-full">
              {prompt?.length || 0}/1000
            </span>
            {errors?.prompt && (
              <FieldError>{errors.prompt?.message}</FieldError>
            )}

            <GroupHeader classNames=" pt-1">
              <button
                type="button"
                onClick={() => setShowNegative(!showNegative)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
              >
                {showNegative ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
                <span>
                  {showNegative
                    ? "Hide negative prompt"
                    : "Add negative prompt"}
                </span>
              </button>

              <span className="text-[11px] text-muted-foreground/60 hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border">
                  Ctrl
                </kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border">
                  Enter
                </kbd>
                <span>to generate</span>
              </span>
            </GroupHeader>

            {showNegative && (
              <div className="space-y-2 pt-4 animate-in fade-in-0 duration-200">
                <FieldLabel className="text-xs text-muted-foreground">
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                  <span>Negative Prompt (What to exclude)</span>
                </FieldLabel>
                <Input
                  {...register("negPrompt")}
                  placeholder="blurry, distorted, low quality, duplicate, extra limbs..."
                />
                {errors?.negPrompt && (
                  <FieldError>{errors.negPrompt?.message}</FieldError>
                )}
              </div>
            )}
          </div>
        </FieldGroup>

        <FieldGroup className="space-y-3">
          <GroupHeader>
            <FieldLabel className="text-sm">
              <Palette className="w-4 h-4 text-purple-500" />
              <span>Art Style</span>
            </FieldLabel>
            <span className="text-xs text-muted-foreground">
              {STYLES.find((s) => s.id === selectedStyleId)?.name || "auto"}
            </span>
          </GroupHeader>

          <Controller
            name="artStyle"
            control={control}
            render={({ field, fieldState }) => (
              <RadioGroup
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              >
                {STYLES.map((style) => {
                  const isSelected = style.id === field.value;

                  return (
                    <FieldLabel
                      key={style.id}
                      htmlFor={`art-style-${style.id}`}
                      className={cn(
                        "group relative flex min-h-25 w-full cursor-pointer flex-col overflow-hidden rounded-xl border p-3 text-left font-normal transition-all duration-200",
                        "hover:scale-[1.02]",
                        isSelected
                          ? "border-primary bg-primary/10 ring-2 ring-primary/40 shadow-md"
                          : "border-border/60 bg-card/60 hover:border-border hover:bg-card/90",
                      )}
                    >
                      <RadioGroupItem
                        value={style.id}
                        id={`art-style-${style.id}`}
                        aria-invalid={fieldState.invalid}
                        className="sr-only"
                      />

                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
                          "group-hover:opacity-60",
                          isSelected && "opacity-60",
                        )}
                        style={{
                          backgroundImage: style.gradient,
                        }}
                      />

                      <Badge
                        variant="secondary"
                        className="rounded-full absolute top-1.5 left-1.5 z-20"
                      >
                        {style.category}
                      </Badge>

                      <div className="relative z-10 mt-auto pr-7 pt-4">
                        <p className="whitespace-normal wrap-break-word text-xs font-semibold leading-tight transition-colors">
                          {style.name}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </FieldLabel>
                  );
                })}
              </RadioGroup>
            )}
          />
          {errors?.artStyle && (
            <FieldError>{errors.artStyle?.message}</FieldError>
          )}
        </FieldGroup>

        <FieldGroup className="mt-2">
          <FieldLabel className="text-sm">
            <Wand2 className="w-4 h-4 text-orange-400" />
            <span>Model</span>
          </FieldLabel>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <GroupHeader classNames="border-t border-border px-3">
            <div className="space-y-0.5 mt-4">
              <FieldLabel className="text-xs">
                {isPublic ? (
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                )}
                {isPublic ? "Public Generation" : "Private Generation"}
              </FieldLabel>
              <FieldDescription className="text-[11px]">
                {isPublic
                  ? "Image will be visible in the community gallery"
                  : "Your image will not be saved and can only be viewed once"}
              </FieldDescription>
            </div>

            <Switch
              checked={isPublic}
              onCheckedChange={(checked) => setValue("public", checked)}
            />
          </GroupHeader>
        </FieldGroup>
        {errors.root && <FieldError errors={[errors.root]} />}
        <Button
          type="submit"
          className="w-full h-12 text-base font-bold gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.01]"
        >
          {status === "generating" ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating Image...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate Image</span>
              <Zap className="w-4 h-4 text-amber-200 ml-auto" />
            </>
          )}
        </Button>
      </FieldSet>
    </form>
  );
}
